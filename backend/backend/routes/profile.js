const express = require("express");
const formiddable_route = require("../middleware/formiddable");
const profileController = require("../controllers/profile");
const userMe = require("../middleware/user");
const router = express.Router();

router.post("/profile", formiddable_route, userMe, profileController.file_upload);

router.patch("/profile/edit/:_id", userMe, profileController.profile_edit);

module.exports = router;
