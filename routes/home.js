const express = require("express");
const homeController = require("../controller/home");

const router = express.Router();

router.use("/", homeController.getHome);

module.exports = router;
