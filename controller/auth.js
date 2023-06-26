const path = require("path");
const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "pages", "login", "login.html"));
};

exports.getRegister = (req, res, next) => {
  res.sendFile(
    path.join(__dirname, "../", "pages", "register", "register.html")
  );
};

exports.getEmailValidate = (req, res, next) => {
  res.sendFile(
    path.join(__dirname, "../", "pages", "email_validation", "email.html")
  );
};

exports.postLogin = (req, res, next) => {};

exports.postRegister = (req, res, next) => {};

exports.postEmailValidate = (req, res, next) => {};
