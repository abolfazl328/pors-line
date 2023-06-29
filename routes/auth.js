const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");
const isRegister = require("../middleware/is-registerd");
const isAuth = require("../middleware/is-auth");

router.get("/login", authController.getLogin);

router.get("/register", authController.getRegister);

router.get("/emailValidataion", isRegister, authController.getEmailValidate);

router.get("/reset", authController.getReset);

router.get("/resetPassword", authController.getResetPassword);

router.post("/login", authController.postLogin);

router.post("/register", authController.postRegister);

router.post("/emailValidataion", isRegister, authController.postEmailValidate);

router.post("/reset", authController.postReset);

router.post("/resetPassword", authController.postResetPassword);

router.get("/logout", isAuth, authController.getLogOut);

module.exports = router;
