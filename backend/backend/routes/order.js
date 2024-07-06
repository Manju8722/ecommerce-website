const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.js");
const userMe = require("../middleware/user");

router.get("/get-orders", userMe, orderController.get_orders);

router.get("/get-order/:_id", userMe, orderController.get_order_by_id);

module.exports = router;
