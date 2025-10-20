import React, { useEffect, useState } from "react";
import productService from "../../Services/product-service";
import ProductForm from "./productForm";

const ProductList = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await productService.getProducts();
      setProducts(response.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await productService.deleteProduct(id, token);
      fetchProducts();
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  };

  const handleSubmit = async (product) => {
    try {
      if (editing) {
        await productService.updateProduct(editing.product_id, product, token);
        setEditing(null);
      } else {
        await productService.createProduct(product, token);
      }
      fetchProducts();
    } catch (err) {
      console.error("Failed to save product:", err);
    }
  };

  return (
    <div className="p-6">
      <ProductForm initialData={editing} onSubmit={handleSubmit} />

      <h2 className="text-2xl mt-8 mb-4">Products List</h2>
      <table className="w-full border">
        <thead>
          <tr className="border-b">
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.product_id} className="border-b">
              <td>{p.name}</td>
              <td>${p.price}</td>
              <td>{p.stock}</td>
              <td>
                <button
                  onClick={() => setEditing(p)}
                  className="mr-2 bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.product_id)}
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
  );
};

export default ProductList;
