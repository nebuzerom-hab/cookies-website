// Backend/Routes/seedRoutes.js
const express = require("express");
const router = express.Router();
const installAndSeedProducts = require("../Service/productinstall-service");

router.get("/productsinstall", async (req, res) => {
  try {
    await installAndSeedProducts();
    res.status(200).json({ message: "✅ Products seeded successfully!" });
  } catch (err) {
    res.status(500).json({ error: "❌ Seeding failed: " + err.message });
  }
});

module.exports = router;
