// ======================= orderService.js =======================
import API from "./api.js";

const orderService = {
  // ✅ Create order (works for guest or logged-in user)
  createOrder: (data, token) => {
    return API.post("/orders", data, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  },

  // ✅ Get all orders (admin/manager sees all, user sees own)
  getOrders: (token) => {
    if (!token) throw new Error("User not logged in");
    return API.get("/orders", {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // ✅ Get a specific order by ID
  getOrderById: (id, token) => {
    if (!token) throw new Error("User not logged in");
    return API.get(`/orders/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // ✅ Update a specific order (admin can update any order)
  updateOrder: (id, data, token) => {
    if (!token) throw new Error("User not logged in");
    return API.put(`/orders/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // ✅ Delete a specific order (admin can delete any order)
  deleteOrder: (id, token) => {
    if (!token) throw new Error("User not logged in");
    return API.delete(`/orders/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // ✅ Get all addresses for logged-in user
  getAddresses: (token) => {
    if (!token) throw new Error("User not logged in");
    return API.get("/orders/address", {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
};

export default orderService;
