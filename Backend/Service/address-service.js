const db = require("../Database/DBConfi");

// Create a new address
async function createAddress(addressData) {
  const {
    order_id,
    first_name,
    last_name,
    phone,
    email,
    address,
    address_2 = null,
    city,
    state,
    zip_code,
    shipping_option = null,
  } = addressData;

  const [result] = await db.query(
    `INSERT INTO addresses
      (order_id, first_name, last_name, phone, email, address, address_2, city, state, zip_code, shipping_option)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      order_id,
      first_name,
      last_name,
      phone,
      email,
      address,
      address_2,
      city,
      state,
      zip_code,
      shipping_option,
    ]
  );

  return {
    address_id: result.insertId,
    ...addressData,
  };
}

// ✅ Get addresses for a specific user
async function getAddressesByUser(userId) {
  const [rows] = await db.query(
    `SELECT a.* 
     FROM addresses a
     JOIN orders o ON a.order_id = o.order_id
     WHERE o.user_id = ?
     ORDER BY a.address_id DESC`,
    [userId]
  );
  return rows;
}

// ✅ Get all addresses (admin only)
async function getAllAddresses() {
  const [rows] = await db.query(
    `SELECT a.*, o.user_id 
     FROM addresses a
     JOIN orders o ON a.order_id = o.order_id
     ORDER BY a.address_id DESC`
  );
  return rows;
}

module.exports = { createAddress, getAddressesByUser, getAllAddresses };
