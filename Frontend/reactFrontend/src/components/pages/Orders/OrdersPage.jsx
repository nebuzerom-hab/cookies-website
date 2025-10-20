import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import orderService from "../../Services/order-service.js";
import CreateOrder from "./CreateOrder.jsx";
import big from "../../../assets/big.jpg";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserHeader from "../../Header/UserHeader.jsx";

const OrdersPage = () => {
  const { isLogged, token } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard"); // dashboard, new, myOrders
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Edit modal state
  const [editingOrder, setEditingOrder] = useState(null);
  const [statusEditingOrder, setStatusEditingOrder] = useState(null);
  const [editForm, setEditForm] = useState({});

  // Fetch orders
  const fetchOrders = async () => {
    if (!isLogged) return;
    setLoadingOrders(true);
    try {
      const res = await orderService.getOrders(token);
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      toast.error("Failed to fetch orders");
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    if (activeTab === "myOrders") fetchOrders();
  }, [activeTab]);

  // Delete order
  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await orderService.deleteOrder(orderId, token);
      toast.success("Order deleted successfully!");
      fetchOrders();
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete order");
    }
  };

  // Open edit order modal
  const handleOpenEdit = (order) => {
    setEditingOrder(order);
    setEditForm({
      delivery_date: order.delivery_date || "",
      habesha_cookies_quantity: order.habesha_cookies_quantity,
      baklava_quantity: order.baklava_quantity,
      almunium_phoil_quantity: order.almunium_phoil_quantity,
      packaging_type: order.packaging_type || "small",
      special_instructions: order.special_instructions || "",
      address: order.address || "",
      total_price: order.total_price,
    });
  };

  const handleCloseEdit = () => {
    setEditingOrder(null);
    setEditForm({});
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await orderService.updateOrder(editingOrder.order_id, editForm, token);
      toast.success("Order updated successfully!");
      handleCloseEdit();
      fetchOrders();
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update order");
    }
  };

  // Open status edit modal
  const handleOpenStatusEdit = (order) => {
    setStatusEditingOrder(order);
    setEditForm({ order_status: order.order_status });
  };

  const handleCloseStatusEdit = () => {
    setStatusEditingOrder(null);
    setEditForm({});
  };

  const handleStatusSubmit = async (e) => {
    e.preventDefault();
    try {
      await orderService.updateOrder(
        statusEditingOrder.order_id,
        editForm,
        token
      );
      toast.success("Order status updated!");
      handleCloseStatusEdit();
      fetchOrders();
    } catch (err) {
      console.error("Status update failed:", err);
      toast.error("Failed to update order status");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center"
      style={{ backgroundImage: `url(${big})` }}
    >
      <UserHeader />
      <div className="p-6 max-w-6xl w-full">
        <ToastContainer position="top-right" autoClose={3000} />

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "new" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("new")}
          >
            New Order
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "myOrders"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("myOrders")}
          >
            My Orders
          </button>
        </div>

        {/* Content */}
        {activeTab === "new" && (
          <CreateOrder onOrderCreated={() => setActiveTab("myOrders")} />
        )}

        {activeTab === "myOrders" && (
          <div>
            {loadingOrders ? (
              <p>Loading orders...</p>
            ) : orders.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border px-2 py-1">Order ID</th>
                    <th className="border px-2 py-1">Customer</th>
                    <th className="border px-2 py-1">Address</th>
                    <th className="border px-2 py-1">Total</th>
                    <th className="border px-2 py-1">Status</th>
                    <th className="border px-2 py-1">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.order_id}>
                      <td className="border px-2 py-1">{order.order_id}</td>
                      <td className="border px-2 py-1">
                        {order.first_name} {order.last_name}
                      </td>
                      <td className="border px-2 py-1">
                        {order.address || "N/A"}
                      </td>
                      <td className="border px-2 py-1">
                        ${Number(order.total_price).toFixed(2)}
                      </td>
                      <td className="border px-2 py-1">{order.order_status}</td>
                      <td className="border px-2 py-1 flex gap-2">
                        <button
                          className="bg-yellow-400 text-white px-2 py-1 rounded"
                          onClick={() => handleOpenEdit(order)}
                        >
                          Edit Order
                        </button>
                        <button
                          className="bg-purple-500 text-white px-2 py-1 rounded"
                          onClick={() => handleOpenStatusEdit(order)}
                        >
                          Edit Status
                        </button>
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded"
                          onClick={() => handleDeleteOrder(order.order_id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Edit Order Modal */}
        {editingOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">
                Edit Order #{editingOrder.order_id}
              </h2>
              <form onSubmit={handleEditSubmit} className="flex flex-col gap-3">
                <label>
                  Delivery Date:
                  <input
                    type="date"
                    name="delivery_date"
                    value={editForm.delivery_date}
                    onChange={handleEditChange}
                    className="border p-1 w-full"
                    required
                  />
                </label>
                <label>
                  Address:
                  <input
                    type="text"
                    name="address"
                    value={editForm.address}
                    onChange={handleEditChange}
                    className="border p-1 w-full"
                  />
                </label>
                <label>
                  Habesha Cookies Quantity:
                  <input
                    type="number"
                    name="habesha_cookies_quantity"
                    value={editForm.habesha_cookies_quantity}
                    onChange={handleEditChange}
                    className="border p-1 w-full"
                  />
                </label>
                <label>
                  Baklava Quantity:
                  <input
                    type="number"
                    name="baklava_quantity"
                    value={editForm.baklava_quantity}
                    onChange={handleEditChange}
                    className="border p-1 w-full"
                  />
                </label>
                <label>
                  Almunium Phoil Quantity:
                  <input
                    type="number"
                    name="almunium_phoil_quantity"
                    value={editForm.almunium_phoil_quantity}
                    onChange={handleEditChange}
                    className="border p-1 w-full"
                  />
                </label>
                <label>
                  Packaging Type:
                  <select
                    name="packaging_type"
                    value={editForm.packaging_type}
                    onChange={handleEditChange}
                    className="border p-1 w-full"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </label>
                <label>
                  Special Instructions:
                  <input
                    type="text"
                    name="special_instructions"
                    value={editForm.special_instructions}
                    onChange={handleEditChange}
                    className="border p-1 w-full"
                  />
                </label>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    className="bg-gray-300 px-3 py-1 rounded"
                    onClick={handleCloseEdit}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Status Modal */}
        {statusEditingOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded w-72">
              <h2 className="text-xl font-bold mb-4">
                Update Status for Order #{statusEditingOrder.order_id}
              </h2>
              <form
                onSubmit={handleStatusSubmit}
                className="flex flex-col gap-3"
              >
                <select
                  name="order_status"
                  value={editForm.order_status}
                  onChange={handleEditChange}
                  className="border p-1 w-full"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    className="bg-gray-300 px-3 py-1 rounded"
                    onClick={handleCloseStatusEdit}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-purple-500 text-white px-3 py-1 rounded"
                  >
                    Update Status
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
