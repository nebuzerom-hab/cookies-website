// Backend/Service/productService.js
const { query } = require("../Database/DBConfi");

const getAllProducts = async () => {
  const row = await query("SELECT * FROM products");
  return row;
};

const getProductById = async (id) => {
  const row = await query("SELECT * FROM products WHERE product_id = ?", [id]);
  return row;
};

const addProduct = async (product) => {
  const { name, description, price, stock, category, image } = product;
  const sql = `
    INSERT INTO products (name, description, price, stock, category, image)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const row = await query(sql, [
    name,
    description || null,
    price,
    stock,
    category || null,
    image || null,
  ]);
  return row;
};

const updateProduct = async (id, product) => {
  const { name, description, price, stock, category, image } = product;
  const sql = `
    UPDATE products
    SET name = ?, description = ?, price = ?, stock = ?, category = ?, image = ?, updated_at = CURRENT_TIMESTAMP
    WHERE product_id = ?
  `;
  const row = await query(sql, [
    name,
    description,
    price,
    stock,
    category,
    image,
    id,
  ]);
  return row;
};

const deleteProduct = async (id) => {
  const row = await query("DELETE FROM products WHERE product_id = ?", [id]);
  return row;
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
