const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");

router.get("/login", authController.getLogin);

router.get("/register", authController.getRegister);

router.get("/emailValidataion", authController.getEmailValidate);

module.exports = router;
