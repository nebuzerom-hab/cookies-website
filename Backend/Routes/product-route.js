// Backend/Routes/productRoutes.js
const express = require("express");
const router = express.Router();
const {getProducts,getProduct,createProduct,updateProduct,deleteProduct} = require("../Controller/product-control");

// Routes

router.get("/products",getProducts)
router.post("/products", createProduct);
router.put("/products/:id", updateProduct);
router.get("/products/:id", getProduct);
router.delete("/products/:id", deleteProduct);


module.exports = router;
