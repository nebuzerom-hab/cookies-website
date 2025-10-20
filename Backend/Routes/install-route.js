const express = require("express") 
const router = express.Router();
 const installController = require("../Controller/install-control");

 router.get("/install", installController.install);

 module.exports = router;
