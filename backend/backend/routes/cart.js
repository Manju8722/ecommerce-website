const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.js");
const userMe = require("../middleware/user");

router.post(
  "/add-product-to-cart",
  [userMe],
  cartController.add_product_to_cart
);

router.get("/get-user-cart", [userMe], cartController.get_user_cart);

router.patch(
  "/delete-cart-product/:_id",
  [userMe],
  cartController.delete_cart_product
);

module.exports = router;
