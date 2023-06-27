const path = require("path");
const User = require("../models/user");
const random = require("../util/rand");
const bcrypt = require("bcryptjs");
const { error } = require("console");

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
      if (user) {
        bcrypt
          .compare(req.body.password, user.password)
          .then((result) => {
            if (result && user.validated) {
              req.session.isloggedIn = true;
              req.session.user = user;
              return res.redirect("/form/form-maker");
            } else {
              res.redirect("/auth/login");
            }
          })
          .catch((err) => {
            res.redirect("/auth/login");
            console.log(err);
          });
      } else {
        res.redirect("/auth/login");
      }
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/auth/login");
    });
};

exports.postRegister = (req, res, next) => {
  req.session.email = req.body.email;
  bcrypt
    .hash(req.body.pass, 12)
    .then((hashPass) => {
      User.create({
        email: req.body.email,
        password: hashPass,
        validation_code: random(),
        validated: false,
      }).catch((err) => {
        console.log(err);
        res.redirect("/auth/register");
      });
    })
    .then(() => {
      res.redirect("/auth/emailValidataion");
    })
    .catch((err) => {
      console.log(err);
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
