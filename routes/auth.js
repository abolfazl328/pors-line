const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");

router.get("/login", authController.getLogin);

router.get("/register", authController.getRegister);

router.get("/emailValidataion", authController.getEmailValidate);

router.post("/login", authController.postLogin);

router.post("/register", authController.postRegister);

router.post("/emailValidataion", authController.postEmailValidate);

module.exports = router;
