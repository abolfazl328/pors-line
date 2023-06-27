const express = require("express");

const router = express.Router();

const formMakerController = require("../controller/form_maker");

router.get("/form-maker", formMakerController.getFormMaker);

router.post("/form-maker", formMakerController.postFormMaker);

module.exports = router;
