const express = require("express");
const homeController = require("../controller/home");

const router = express.Router();

router.use("/", (req, res, next) => {
  next();
});

router.use("/home", homeController.getHome);

module.exports = router;
