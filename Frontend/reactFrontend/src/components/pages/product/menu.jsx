import React, { useEffect, useState } from "react";
import productService from "../../Services/product-service";
import MenuHeader from "../../Header/menuHeader";

const Menu = () => {
  const [products, setProducts] = useState([]);

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

  return (
    <div className="min-h-screen bg-gray-50">
      <MenuHeader />
      {/* products grid here */}
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-6">Our Menu</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.product_id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image container */}
              <div className="w-full h-64 flex items-center justify-center bg-gray-100">
                <img
                  src={product.image ? product.image : "/images/default.webp"}
                  alt={product.name}
                  className="max-h-full object-contain"
                />
              </div>

              <div className="p-4">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <p className="font-bold text-lg text-blue-600">
                  ${product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
