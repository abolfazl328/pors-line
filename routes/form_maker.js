const express = require("express");

const router = express.Router();

const formMakerController = require("../controller/form_maker");

router.get("/form-maker", formMakerController.getFormMaker);

module.exports = router;
