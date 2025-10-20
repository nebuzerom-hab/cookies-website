const orderService = require("../Service/order-service");

// ===================== Create Order =====================
// Supports both guest and logged-in users
async function createOrder(req, res) {
  try {
    const userId = req.user ? req.user.id : null;

    const orderData = {
      user_id: userId,
      first_name: req.user?.firstname || req.body.first_name || "",
      last_name: req.user?.lastname || req.body.last_name || "",
      email: req.user?.email || req.body.email || "",
      phone: req.body.phone || "",
      address: req.body.address || "",
      address_2: req.body.address_2 || "",
      city: req.body.city || "",
      state: req.body.state || "",
      zip_code: req.body.zip_code || "",
      shipping_option: req.body.shipping_option || "",
      delivery_date: req.body.delivery_date || null,
      habesha_cookies_quantity: req.body.habesha_cookies_quantity ?? 0,
      baklava_quantity: req.body.baklava_quantity ?? 0,
      almunium_phoil_quantity: req.body.almunium_phoil_quantity ?? 0,
      packaging_type: req.body.packaging_type || "small",
      special_instructions: req.body.special_instructions || "",
      total_price: req.body.total_price ?? 0,
      order_status: "Pending",
    };

    const result = await orderService.createOrder(orderData);
    return res.status(201).json(result);
  } catch (err) {
    console.error("Create Order error:", err.message);
    return res.status(500).json({ msg: err.message });
  }
}

// ===================== Get All Orders =====================
async function getOrders(req, res) {
  if (!req.user) return res.status(401).json({ msg: "Unauthorized" });

  try {
    const { id, role } = req.user; // ✅ include role

    let orders;
    if (role === "Admin" || role === "Manager") {
      // ✅ Admins and Managers can see ALL orders
      orders = await orderService.getAllOrders();
    } else {
      // ✅ Regular users only see their own
      orders = await orderService.getOrdersByUser(id);
    }

    return res.status(200).json(orders || []);
  } catch (err) {
    console.error("Get Orders error:", err.message);
    return res.status(500).json({ msg: err.message });
  }
}


// ===================== Get Order by ID =====================
async function getOrderById(req, res) {
  if (!req.user) return res.status(401).json({ msg: "Unauthorized" });

  try {
    const order = await orderService.getOrderById(req.params.id, req.user.id);
    if (!order) return res.status(404).json({ msg: "Order not found" });
    return res.status(200).json(order);
  } catch (err) {
    console.error("Get Order by ID error:", err.message);
    return res.status(500).json({ msg: err.message });
  }
}

// ===================== Update Order =====================
async function updateOrder(req, res) {
  if (!req.user) return res.status(401).json({ msg: "Unauthorized" });
  try {
    const isAdmin = req.user.role === "Admin" || req.user.role === "Manager";
    const updatedOrder = await orderService.updateOrder(
      req.params.id,
      req.user.id,
      req.body,
      isAdmin
    );
    return res.status(200).json(updatedOrder);
  } catch (err) {
    console.error("Update Order error:", err.message);
    return res.status(500).json({ msg: err.message });
  }
}


// ===================== Delete Order =====================
async function deleteOrder(req, res) {
  if (!req.user) return res.status(401).json({ msg: "Unauthorized" });
  try {
    const isAdmin = req.user.role === "Admin" || req.user.role === "Manager";
    const deleted = await orderService.deleteOrder(
      req.params.id,
      req.user.id,
      isAdmin
    );
    if (!deleted) return res.status(404).json({ msg: "Order not found" });
    return res.status(200).json({ msg: "Order deleted" });
  } catch (err) {
    console.error("Delete Order error:", err.message);
    return res.status(500).json({ msg: err.message });
  }
}


// ===================== Get Addresses =====================
async function getAddresses(req, res) {
  if (!req.user) return res.status(401).json({ msg: "Unauthorized" });

  try {
    const addresses = await orderService.getAddressByUser(req.user.id);
    return res.status(200).json(addresses || []);
  } catch (err) {
    console.error("Get Addresses error:", err.message);
    return res.status(500).json({ msg: err.message });
  }
}

// ===================== Export =====================
module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getAddresses,
};
