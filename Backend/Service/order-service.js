const db = require("../Database/DBConfi");
const nodemailer = require("nodemailer");

// =================== Email Transporter ===================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// =================== Helper Functions ===================
function escapeHtml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatPrice(value) {
  const num = Number(value) || 0;
  return num.toFixed(2);
}

function formatDateSafe(date) {
  const d = new Date(date);
  return isNaN(d) ? "" : d.toLocaleDateString();
}

// =================== Email Function ===================
async function sendOrderEmail(userEmail, orderDetails) {
  if (!userEmail) return;

  const html = `
    <h2>Thank you for your order, ${escapeHtml(
      orderDetails.first_name || "Customer"
    )}!</h2>
    <p><strong>Order Number:</strong> ${orderDetails.orderId}</p>
    <p><strong>Delivery Date:</strong> ${formatDateSafe(
      orderDetails.delivery_date
    )}</p>
    <p><strong>Total:</strong> $${formatPrice(orderDetails.total_price)}</p>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: `Order Confirmation - #${orderDetails.orderId}`,
      html,
    });
    console.log("✅ Order email sent successfully!");
  } catch (err) {
    console.error("❌ Error sending email:", err.message);
  }
}

// =================== Create Order ===================
async function createOrder(data) {
  try {
    // Insert order
    const orderResult = await db.query(
      `INSERT INTO orders 
        (user_id, delivery_date, habesha_cookies_quantity, baklava_quantity, almunium_phoil_quantity, packaging_type, special_instructions, total_price, order_status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.user_id,
        data.delivery_date || null,
        data.habesha_cookies_quantity ?? 0,
        data.baklava_quantity ?? 0,
        data.almunium_phoil_quantity ?? 0,
        data.packaging_type || "small",
        data.special_instructions || null,
        data.total_price ?? 0,
        "Pending",
      ]
    );

    const orderId = orderResult.insertId;

    // Insert address
    await db.query(
      `INSERT INTO addresses
        (order_id, first_name, last_name, phone, email, address, address_2, city, state, zip_code, shipping_option)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        orderId,
        data.first_name || null,
        data.last_name || null,
        data.phone || null,
        data.email || null,
        data.address || null,
        data.address_2 || null,
        data.city || null,
        data.state || null,
        data.zip_code || null,
        data.shipping_option || null,
      ]
    );

    const orderDetails = { orderId, ...data };
    await sendOrderEmail(data.email, orderDetails);

    return { message: "Order created successfully", orderId };
  } catch (err) {
    console.error("Order creation failed:", err.message);
    throw err;
  }
}

// =================== Get All Orders ===================
async function getAllOrders() {
  const sql = `
    SELECT 
      o.*, 
      a.first_name, a.last_name, a.email, a.address, a.address_2, a.city, a.state, a.zip_code, a.shipping_option,
      u.user_firstName, u.user_lastName, u.user_email
    FROM orders o
    LEFT JOIN addresses a ON o.order_id = a.order_id
    LEFT JOIN users u ON o.user_id = u.user_id
    ORDER BY o.created_at DESC
  `;
  const rows = await db.query(sql);
  return rows;
}

// =================== Get Orders By User ===================
async function getOrdersByUser(userId) {
  const sql = `
    SELECT o.*, a.first_name, a.last_name, a.email, a.address, a.address_2, a.city, a.state, a.zip_code, a.shipping_option
    FROM orders o
    LEFT JOIN addresses a ON o.order_id = a.order_id
    WHERE o.user_id = ?
    ORDER BY o.created_at DESC
  `;
  const rows = await db.query(sql, [userId]);
  return rows;
}

// =================== Get Order By ID ===================
async function getOrderById(orderId, userId = null, isAdmin = false) {
  let sql = `
    SELECT o.*, a.first_name, a.last_name, a.email, a.address, a.address_2, a.city, a.state, a.zip_code, a.shipping_option
    FROM orders o
    LEFT JOIN addresses a ON o.order_id = a.order_id
    WHERE o.order_id = ?
  `;
  const params = [orderId];

  if (!isAdmin && userId) {
    sql += " AND o.user_id = ?";
    params.push(userId);
  }

  const rows = await db.query(sql, params);
  return rows[0] || null;
}

// =================== Update Order ===================
async function updateOrder(orderId, userId, updateData, isAdmin = false) {
  const orderFields = [];
  const orderValues = [];
  const addressFields = [];
  const addressValues = [];

  const orderColumns = [
    "delivery_date",
    "habesha_cookies_quantity",
    "baklava_quantity",
    "almunium_phoil_quantity",
    "packaging_type",
    "special_instructions",
    "order_status",
    "total_price",
  ];
  const addressColumns = [
    "first_name",
    "last_name",
    "phone",
    "email",
    "address",
    "address_2",
    "city",
    "state",
    "zip_code",
    "shipping_option",
  ];

  for (const key of Object.keys(updateData)) {
    if (orderColumns.includes(key)) {
      orderFields.push(`${key} = ?`);
      orderValues.push(updateData[key]);
    } else if (addressColumns.includes(key)) {
      addressFields.push(`${key} = ?`);
      addressValues.push(updateData[key]);
    }
  }

  try {
    if (orderFields.length) {
      const sql = `UPDATE orders SET ${orderFields.join(
        ", "
      )}, updated_at = CURRENT_TIMESTAMP WHERE order_id = ? ${
        !isAdmin ? "AND user_id = ?" : ""
      }`;
      await db.query(
        sql,
        !isAdmin ? [...orderValues, orderId, userId] : [...orderValues, orderId]
      );
    }

    if (addressFields.length) {
      const sql = `UPDATE addresses SET ${addressFields.join(
        ", "
      )} WHERE order_id = ?`;
      await db.query(sql, [...addressValues, orderId]);
    }

    return getOrderById(orderId, userId, isAdmin);
  } catch (err) {
    console.error("Order update failed:", err.message);
    throw err;
  }
}

// =================== Delete Order ===================
async function deleteOrder(orderId, userId, isAdmin = false) {
  try {
    const order = await getOrderById(orderId, userId, isAdmin);
    if (!order) return null;

    await db.query(`DELETE FROM addresses WHERE order_id = ?`, [orderId]);
    const sql = `DELETE FROM orders WHERE order_id = ? ${
      !isAdmin ? "AND user_id = ?" : ""
    }`;
    await db.query(sql, !isAdmin ? [orderId, userId] : [orderId]);

    return order;
  } catch (err) {
    console.error("Order deletion failed:", err.message);
    throw err;
  }
}

// =================== Get Addresses By User ===================
async function getAddressByUser(userId) {
  const sql = `
    SELECT a.* 
    FROM addresses a
    JOIN orders o ON a.order_id = o.order_id
    WHERE o.user_id = ?
    ORDER BY a.address_id DESC
  `;
  const rows = await db.query(sql, [userId]);
  return rows;
}

// =================== Export ===================
module.exports = {
  createOrder,
  getAllOrders,
  getOrdersByUser,
  getOrderById,
  updateOrder,
  deleteOrder,
  getAddressByUser,
};
