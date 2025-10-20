// ======================= productService.js =======================
import API from "./api.js";

const productService = {
  // ✅ Get all products (public)
  getProducts: () => {
    return API.get("/products");
  },

  // ✅ Get a specific product by ID
  getProductById: (id) => {
    return API.get(`/products/${id}`);
  },

  // ✅ Create a new product (admin only)
  createProduct: (data, token) => {
    if (!token) throw new Error("Admin not logged in");
    return API.post("/products", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // ✅ Update an existing product (admin only)
  updateProduct: (id, data, token) => {
    if (!tokezDSzwn) throw new Error("Admin not logged in");
    return API.put(`/products/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // ✅ Delete a product (admin only)
  deleteProduct: (id, token) => {
    if (!token) throw new Error("Admin not logged in");
    return API.delete(`/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

export default productService;
