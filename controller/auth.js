const path = require("path");
const User = require("../models/user");
const random = require("../util/rand");
const bcrypt = require("bcryptjs");
const emailSender = require("../util/email_service");
const crypto = require("crypto");
const { validationResult } = require("express-validator");

exports.getLogin = (req, res, next) => {
  res.render("login", { error: false });
};

exports.getRegister = (req, res, next) => {
  res.render("register", {});
};

exports.getEmailValidate = (req, res, next) => {
  res.render("email_code", {
    error: false,
    title: "بررسی ایمیل",
    message: "لطفا کد ارسالی به ایمیل خود را وارد کنید",
    path: "emailValidataion",
    name: "code",
  });
};

exports.getReset = (req, res, next) => {
  res.render("email_code", {
    error: false,
    title: "بازیابی رمز عبور",
    message: "لطفاایمیل خود را وارد کنید",
    path: "reset",
    name: "email",
  });
};

exports.getResetPassword = (req, res, next) => {
  const token = req.query.token;
  const email = req.query.email;
  User.findOne({ where: { email: email } })
    .then((user) => {
      if (user.resetToken == token && user.resetTokenExpiration > Date.now()) {
        return res.render("reset_password", {
          error: false,
          token: token,
          email: user.email,
        });
      }
      return res.redirect("/auth/login");
    })
    .catch((err) => console.log(err));
};

exports.postLogin = (req, res, next) => {
  const erros = validationResult(req);
  if (!erros.isEmpty()) {
    return res.status(422).render("/auth/login");
  }
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user) {
        bcrypt
          .compare(req.body.password, user.password)
          .then((result) => {
            if (result && user.validated) {
              req.session.isloggedIn = true;
              req.session.user = user;
              req.session.save((err) => {
                return res.redirect("/form/forms");
              });
            } else {
              res.render("login", {
                error: true,
                errorMessage: "رمز عبور اشتباه است",
              });
            }
          })
          .catch((err) => {
            res.render("login", {
              error: true,
              errorMessage: "حطا در ورود",
            });
            console.log(err);
          });
      } else {
        res.render("login", {
          error: true,
          errorMessage: "کاربر یافت نشد",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.render("login", {
        error: true,
        errorMessage: "حطا در ورود",
      });
    });
};

exports.postRegister = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user) {
        return res.redirect("/auth/login");
      } else {
        req.session.email = req.body.email;
        req.session.save((err) => {
          console.log(err);
          const validatCode = random();
          bcrypt
            .hash(req.body.pass, 12)
            .then((hashPass) => {
              User.create({
                email: req.body.email,
                password: hashPass,
                validation_code: validatCode,
                validated: false,
              }).catch((err) => {
                console.log(err);
                res.redirect("/auth/register");
              });
            })
            .then(() => {
              res.redirect("/auth/emailValidataion");
              emailSender.sendMail(
                req.body.email,
                `<p>${validatCode.toString()}<p/>`,
                "validation"
              );
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }
    })
    .catch((err) => console.log(err));
};

exports.postEmailValidate = (req, res, next) => {
  User.findOne({ where: { email: req.session.email } })
    .then((user) => {
      if (user.validation_code == req.body.code) {
        user.validated = true;
        user.save();
        res.redirect("/auth/login");
      } else {
        res.render("email_code", {
          error: true,
          errorMessage: "کد وارد شده اشتباه است",
          title: "بررسی ایمیل",
          message: "لطفا کد ارسالی به ایمیل خود را وارد کنید",
          path: "emailValidataion",
          name: "code",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/auth/register");
    });
};

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect("/auth/reset");
    }
    const token = buffer.toString("hex");
    User.findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (!user) {
          return res.redirect("/auth/register");
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then((result) => {
        return emailSender.sendMail(
          req.body.email,
          `<p><a href="${process.env.serverHost}/auth/resetPassword/?token=${token}&email=${req.body.email}">click here to change you'r password</a></p>`,
          "Password reset"
        );
      })
      .then((result) => {
        res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
exports.postResetPassword = (req, res, next) => {
  const email = req.body.email;
  const token = req.body.token;
  const pass = req.body.pass;
  User.findOne({ where: { email: email } })
    .then((user) => {
      if (!user) {
        return redirect("/auth/login");
      }
      if (user.resetToken == token && user.resetTokenExpiration > Date.now()) {
        bcrypt.hash(pass, 12).then((hashPass) => {
          user.password = hashPass;
          user.resetToken = undefined;
          user.resetTokenExpiration = undefined;
          return user.save();
        });
      } else {
        return redirect("/auth/login");
      }
    })
    .then((result) => {
      res.redirect("/auth/login");
    })
    .catch((err) => console.log(err));
};
