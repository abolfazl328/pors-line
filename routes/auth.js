const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");
const isRegister = require("../middleware/is-registerd");

router.get("/login", authController.getLogin);

router.get("/register", authController.getRegister);

router.get("/emailValidataion", isRegister, authController.getEmailValidate);

router.post("/login", authController.postLogin);

router.post("/register", authController.postRegister);

router.post("/emailValidataion", isRegister, authController.postEmailValidate);

module.exports = router;
