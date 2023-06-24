const e = require("express");
const express = require("express");
const path = require("path");

const router = express.Router();

router.use(express.static(path.join(__dirname, "../", "pages", "login")));

router.get("/login", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "pages", "login", "login.html"));
});

router.post("/login", (req, res, next) => {
  res.redirect("/home");
});

router.use(express.static(path.join(__dirname, "../", "pages", "register")));

router.get("/register", (req, res, next) => {
  res.sendFile(
    path.join(__dirname, "../", "pages", "register", "register.html")
  );
});

router.post("/register", (req, res, next) => {
  res.redirect("/auth/email_validation");
});

router.use(
  express.static(path.join(__dirname, "../", "pages", "email_validation"))
);

router.post("/email_validation", (req, res, next) => {
  res.sendFile(
    path.join(__dirname, "../", "pages", "email_validation", "email.html")
  );
});

router.post("/email_validator", (req, res, next) => {
  res.redirect("/home");
});

module.exports = router;
