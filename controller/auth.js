const path = require("path");

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
