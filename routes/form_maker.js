const express = require("express");

const router = express.Router();

const formMakerController = require("../controller/form_maker");

const isAuth = require("../middleware/is-auth");

router.get("/form-maker", isAuth, formMakerController.getFormMaker);

router.post("/form-maker", isAuth, formMakerController.postFormMaker);

router.get("/forms", isAuth, formMakerController.getForms);

router.get("/survay/:formId", isAuth, formMakerController.getSurvay);

router.post("/survay", isAuth, formMakerController.postSurvay);

module.exports = router;
