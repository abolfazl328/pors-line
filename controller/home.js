const path = require("path");

exports.getHome = (req, res, next) => {
  console.log(req.session);
  res.render("home", { isLoggedIn: req.session.isloggedIn });
};
