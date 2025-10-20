// Backend/Service/seedAndInstallProductTable.js
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const { query } = require("../Database/DBConfi");
const createProductTableSQL = require("./sqlproduct");

async function installAndSeedProducts() {
  try {
    // 1️⃣ Create products table
    await query(createProductTableSQL);
    console.log("✅ Product table created successfully!");

    // 2️⃣ Sample products to seed
    const products = [
      {
        name: "Chocolate Chip Cookies",
        description: "Delicious homemade chocolate chip cookies.",
        price: 5.0,
        stock: 50,
        category: "Cookies",
        image: "/images/menu1.webp",
      },
      {
        name: "Peanut Butter Cookies",
        description: "Soft and creamy peanut butter cookies.",
        price: 4.0,
        stock: 40,
        category: "Cookies",
        image: "/images/menu2.webp",
      },
      {
        name: "Oatmeal Cookies",
        description: "Healthy and tasty oatmeal cookies.",
        price: 4.5,
        stock: 30,
        category: "Cookies",
        image: "/images/menu3.webp",
      },
      {
        name: "Double Chocolate Cookies",
        description: "Rich chocolate cookies for chocolate lovers.",
        price: 5.5,
        stock: 25,
        category: "Cookies",
        image: "/images/menu4.webp",
      },
    ];

    // 3️⃣ Insert or update products
    for (const p of products) {
      const sql = `
        INSERT INTO products (name, description, price, stock, category, image)
        VALUES (?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          description = VALUES(description),
          price = VALUES(price),
          stock = VALUES(stock),
          category = VALUES(category),
          image = VALUES(image)
      `;
      await query(sql, [
        p.name,
        p.description,
        p.price,
        p.stock,
        p.category,
        p.image,
      ]);
    }

    console.log("✅ Sample products inserted/updated successfully!");
  } catch (err) {
    console.error("❌ Error installing/seeding products:", err.message);
  }
}

// Run installer
installAndSeedProducts();
