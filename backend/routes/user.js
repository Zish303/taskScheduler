const express = require("express");
const router = express.Router();
const user = require("../controller/user");
const verify = require("../middleware/verify");

router.post("/login", user.login);
router.post("/register", user.register);
router.patch("/change-password", verify, user.changePassword);

module.exports = router;
