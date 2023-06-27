const express = require("express");

const router = express.Router();

const formMakerController = require("../controller/form_maker");

router.get("/form-maker", formMakerController.getFormMaker);

router.post("/form-maker", formMakerController.postFormMaker);

router.get("/survay/:formId", formMakerController.getSurvay);

module.exports = router;
