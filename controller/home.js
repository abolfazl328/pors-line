const path = require("path");

exports.getHome = (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "pages", "home", "home.html"));
};
