const path = require("path");
const User = require("../models/user");
const random = require("../util/rand");

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

exports.postLogin = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      console.log(user);
      if (user) {
        if (user.password === req.body.password && user.validated) {
          req.session.loggedIn = true;
          req.session.user = user;
          return res.redirect("/form/form-maker");
        }
      }
      res.redirect("/auth/login");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/auth/login");
    });
};

exports.postRegister = (req, res, next) => {
  req.session.email = req.body.email;
  User.create({
    email: req.body.email,
    password: req.body.pass,
    validation_code: random(),
    validated: false,
  })
    .then(() => {
      res.redirect("/auth/emailValidataion");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/auth/register");
    });
};

exports.postEmailValidate = (req, res, next) => {
  User.findOne({ where: { email: req.session.email } })
    .then((user) => {
      if (user.validation_code == req.body.code) {
        user.validated = true;
        user.save();
        res.redirect("/auth/login");
      } else {
        res.redirect("/auth/emailValidataion");
      }
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/auth/register");
    });
};
