import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import userService from "../Services/user-services";
import orderService from "../Services/order-service";
import productService from "../Services/product-service";
import b2 from "../../assets/b2.jpg";
import AdminHeader from "../Header/AdminHeader";

const AdminDashboard = () => {
  const { user, token, isLogged, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-gray-700">
          Loading authentication...
        </p>
      </div>
    );
  }

  if (
    !isLogged ||
    !user ||
    (user.role !== "Admin" && user.role !== "Manager")
  ) {
    return <Navigate to="/login" />;
  }

  if (!user) return <Navigate to="/login" />;
  if (user.role !== "Admin" && user.role !== "Manager")
    return <Navigate to="/" />;

  const [section, setSection] = useState(""); // initially hidden

  // Users
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  // Orders
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // Products
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
  });

  const [error, setError] = useState("");

  // ====== Fetch Users ======
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await userService.getUsers(token);
        setUsers(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch users");
      } finally {
        setLoadingUsers(false);
      }
    };
    fetchUsers();
  }, [token]);

  // ====== Fetch Orders ======
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await orderService.getOrders(token);
        setOrders(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch orders");
      } finally {
        setLoadingOrders(false);
      }
    };
    fetchOrders();
  }, [token]);

  // ====== Fetch Products ======
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await productService.getProducts(token);
        console.log("Products response:", res);
        setProducts(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch products");
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, [token]);

  // ====== User Section ======
  const handleRoleChange = async (userId, newRole) => {
    try {
      await userService.updateUserRole(userId, newRole, token);
      setUsers(
        users.map((u) => (u.user_id === userId ? { ...u, roles: newRole } : u))
      );
    } catch (err) {
      console.error("Failed to update role", err);
    }
  };

  // ====== Order Section ======
  const handleOrderStatusChange = async (orderId, newStatus) => {
    try {
      await orderService.updateOrder(
        orderId,
        { order_status: newStatus },
        token
      );
      setOrders(
        orders.map((o) =>
          o.order_id === orderId ? { ...o, order_status: newStatus } : o
        )
      );
    } catch (err) {
      console.error("Failed to update order status", err);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await orderService.deleteOrder(orderId, token);
      setOrders(orders.filter((o) => o.order_id !== orderId));
    } catch (err) {
      console.error("Failed to delete order", err);
    }
  };

  // ====== Product Section ======
  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock) return;
    try {
      const res = await productService.createProduct(
        {
          name: newProduct.name,
          price: parseFloat(newProduct.price),
          stock: parseInt(newProduct.stock),
        },
        token
      );
      setProducts((prev) =>
        Array.isArray(prev) ? [...prev, res.data] : [res.data]
      );
      setNewProduct({ name: "", price: "", stock: "" });
    } catch (err) {
      console.error("Failed to add product", err);
    }
  };

  const handleEditProduct = async (product_id, field, value) => {
    try {
      const updated = await productService.updateProduct(
        product_id,
        { [field]: value },
        token
      );
      setProducts((prev) =>
        prev.map((p) =>
          p.product_id === product_id ? { ...p, ...updated.data } : p
        )
      );
    } catch (err) {
      console.error("Failed to update product", err);
    }
  };

  const handleDeleteProduct = async (product_id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await productService.deleteProduct(product_id, token);
      setProducts((prev) => prev.filter((p) => p.product_id !== product_id));
    } catch (err) {
      console.error("Failed to delete product", err);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center"
      style={{ backgroundImage: `url(${b2})` }}
    >
      <AdminHeader />

      <div className="container mx-auto p-6 w-full">
        <h2 className="text-6xl font-semibold text-gray-800 mb-6 text-center">
          Admin Dashboard
        </h2>

        {/* Navigation Buttons */}
        <div className="flex gap-4 justify-center mb-6">
          {["users", "orders", "products", "settings"].map((sec) => (
            <button
              key={sec}
              onClick={() => setSection(sec)}
              className={`px-4 py-2 rounded font-semibold ${
                section === sec
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {sec.charAt(0).toUpperCase() + sec.slice(1)}
            </button>
          ))}
        </div>

        {/* ====== Users Section ====== */}
        {section === "users" && (
          <div>
            <h3 className="text-4xl font-semibold mb-4">Users</h3>
            {loadingUsers && <p>Loading users...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-100 mb-10">
              <table className="min-w-full table-auto">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="py-3 px-4">ID</th>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, i) => (
                    <tr
                      key={u.user_id}
                      className={`${
                        i % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-blue-50 transition`}
                    >
                      <td className="py-3 px-4">{u.user_id}</td>
                      <td className="py-3 px-4">
                        {u.user_firstName} {u.user_lastName}
                      </td>
                      <td className="py-3 px-4">{u.user_email}</td>
                      <td className="py-3 px-4">
                        <select
                          value={u.roles || "Customer"}
                          onChange={(e) =>
                            handleRoleChange(u.user_id, e.target.value)
                          }
                          className="border px-2 py-1 rounded"
                        >
                          <option value="Customer">Customer</option>
                          <option value="Staff">Staff</option>
                          <option value="Manager">Manager</option>
                          <option value="Admin">Admin</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ====== Orders Section ====== */}
        {section === "orders" && (
          <div>
            <h3 className="text-4xl font-semibold mb-4">Orders</h3>
            {loadingOrders && <p>Loading orders...</p>}
            <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-100 mb-10">
              <table className="min-w-full table-auto">
                <thead className="bg-green-600 text-white">
                  <tr>
                    <th className="py-3 px-4">Order ID</th>
                    <th className="py-3 px-4">User</th>
                    <th className="py-3 px-4">Delivery Date</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o, i) => (
                    <tr
                      key={o.order_id}
                      className={`${
                        i % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-green-50 transition`}
                    >
                      <td className="py-3 px-4">{o.order_id}</td>
                      <td className="py-3 px-4">{o.user_email}</td>
                      <td className="py-3 px-4">
                        {new Date(o.delivery_date).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={o.order_status}
                          onChange={(e) =>
                            handleOrderStatusChange(o.order_id, e.target.value)
                          }
                          className="border px-2 py-1 rounded"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleDeleteOrder(o.order_id)}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ====== Products Section ====== */}
        {section === "products" && (
          <div>
            <h3 className="text-4xl font-semibold mb-4">Menu Items</h3>
            {loadingProducts && <p>Loading products...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {/* Add Product Form */}
            <div className="mb-4 flex gap-2">
              <input
                type="text"
                placeholder="Name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                className="border px-2 py-1 rounded"
              />
              <input
                type="number"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                className="border px-2 py-1 rounded"
              />
              <input
                type="number"
                placeholder="Stock"
                value={newProduct.stock}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, stock: e.target.value })
                }
                className="border px-2 py-1 rounded"
              />
              <button
                onClick={handleAddProduct}
                className="bg-blue-600 text-white px-4 py-1 rounded"
              >
                Add
              </button>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-100 mb-10">
              <table className="min-w-full table-auto">
                <thead className="bg-yellow-600 text-white">
                  <tr>
                    <th className="py-3 px-4">ID</th>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Stock</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(products) &&
                    products.map((p, i) => (
                      <tr
                        key={p.product_id}
                        className={`${
                          i % 2 === 0 ? "bg-gray-50" : "bg-white"
                        } hover:bg-yellow-50 transition`}
                      >
                        <td className="py-3 px-4">{p.product_id}</td>
                        <td className="py-3 px-4">
                          <input
                            type="text"
                            value={p.name}
                            onChange={(e) =>
                              handleEditProduct(
                                p.product_id,
                                "name",
                                e.target.value
                              )
                            }
                            className="border px-2 py-1 rounded w-full"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="number"
                            value={p.price}
                            onChange={(e) =>
                              handleEditProduct(
                                p.product_id,
                                "price",
                                parseFloat(e.target.value)
                              )
                            }
                            className="border px-2 py-1 rounded w-full"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="number"
                            value={p.stock}
                            onChange={(e) =>
                              handleEditProduct(
                                p.product_id,
                                "stock",
                                parseInt(e.target.value)
                              )
                            }
                            className="border px-2 py-1 rounded w-full"
                          />
                        </td>
                        <td className="py-3 px-4 flex gap-2">
                          <button
                            onClick={() => handleDeleteProduct(p.product_id)}
                            className="bg-red-500 text-white px-2 py-1 rounded"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ====== Settings Section ====== */}
        {section === "settings" && (
          <div>
            <h3 className="text-4xl font-semibold mb-4">Settings</h3>
            <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col gap-4">
              <div>
                <h4 className="font-semibold">Store Info</h4>
                <input
                  type="text"
                  placeholder="Store Name"
                  className="border px-2 py-1 rounded w-full"
                />
                <input
                  type="text"
                  placeholder="Contact Number"
                  className="border px-2 py-1 rounded w-full mt-2"
                />
                <input
                  type="text"
                  placeholder="Address"
                  className="border px-2 py-1 rounded w-full mt-2"
                />
              </div>
              <div>
                <h4 className="font-semibold mt-4">Payment Methods</h4>
                <input
                  type="text"
                  placeholder="Payment Options"
                  className="border px-2 py-1 rounded w-full"
                />
              </div>
              <div>
                <h4 className="font-semibold mt-4">Shipping</h4>
                <input
                  type="text"
                  placeholder="Shipping Fees / Regions"
                  className="border px-2 py-1 rounded w-full"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
