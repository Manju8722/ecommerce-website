const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.js");
const userMe = require("../middleware/user");

router.get("/get-products", [userMe], productController.get_products);

router.get("/get-product/:id", [userMe], productController.get_product_by_id);

module.exports = router;
