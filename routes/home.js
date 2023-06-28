const express = require("express");
const homeController = require("../controller/home");

const router = express.Router();

router.get("", (req, res, next) => {
  res.redirect("/home");
});

router.use("/home", homeController.getHome);

module.exports = router;
