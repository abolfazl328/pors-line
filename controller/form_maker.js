const path = require("path");

exports.getFormMaker = (req, res, next) => {
  res.sendFile(
    path.join(__dirname, "../", "pages", "form_maker", "form_maker.html")
  );
};
