var express = require("express");
var userRoutes = require("./user/user.routes");
var resturauntRoutes = require("./resturaunt/resturaunt.routes");
var productRoutes = require('./product/product.routes');

const router = express.Router();

router.use("/users", userRoutes);
router.use("/resturaunt", resturauntRoutes);
router.use("/products", productRoutes)

module.exports = router;