const express= require("express");
const router = express.Router();
const installRoute = require("./install-route");
const registerRoute = require("./user-route");
const loginRoute = require("./login-route");
 const orderRoute = require("./order-route");
 const productRoutes=require("./product-route")
// const addressRoute = require("./Routes/address-route"); 
// const forgetPasswordRoute = require("./Routes/forget-password-route");
router.use(installRoute)
router.use(registerRoute)
router.use(loginRoute);
router.use(orderRoute);
router.use(productRoutes);

module.exports=router;






