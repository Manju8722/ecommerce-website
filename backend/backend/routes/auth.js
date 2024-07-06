const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const userMe = require("../middleware/user");

router.post("/login", authController.login_post);

router.post("/signup", authController.signup_post);

router.get("/user",userMe, authController.userMe);

 router.get("/logout",authController.logout_get);

module.exports = router;
