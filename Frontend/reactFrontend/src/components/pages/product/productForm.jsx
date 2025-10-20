import React, { useState, useEffect } from "react";

const ProductForm = ({ initialData = {}, onSubmit }) => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category: "",
    image: "",
    ...initialData,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(product);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white shadow-md rounded-md max-w-lg mx-auto"
    >
      <h2 className="text-2xl mb-4">
        {initialData.product_id ? "Edit Product" : "Add Product"}
      </h2>
      <input
        name="name"
        value={product.name}
        onChange={handleChange}
        placeholder="Name"
        className="w-full mb-2 p-2 border"
      />
      <input
        name="description"
        value={product.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full mb-2 p-2 border"
      />
      <input
        type="number"
        name="price"
        value={product.price}
        onChange={handleChange}
        placeholder="Price"
        className="w-full mb-2 p-2 border"
      />
      <input
        type="number"
        name="stock"
        value={product.stock}
        onChange={handleChange}
        placeholder="Stock"
        className="w-full mb-2 p-2 border"
      />
      <input
        name="category"
        value={product.category}
        onChange={handleChange}
        placeholder="Category"
        className="w-full mb-2 p-2 border"
      />
      <input
        name="image"
        value={product.image}
        onChange={handleChange}
        placeholder="Image URL"
        className="w-full mb-4 p-2 border"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {initialData.product_id ? "Update" : "Add"} Product
      </button>
    </form>
  );
};

export default ProductForm;
