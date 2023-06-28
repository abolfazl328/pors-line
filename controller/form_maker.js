const path = require("path");
const Form = require("../models/form");
const xl = require("excel4node");
const User = require("../models/user");
const ExcelJS = require("exceljs");

exports.getFormMaker = (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "views", "form_maker.html"));
};

exports.postFormMaker = (req, res, next) => {
  let num = Number(req.body.hiddenInput);
  let form = [];
  for (let i = 0; i < num; i++) {
    let question = {};
    if (req.body[`q${i}-multi`]) {
      question[`question`] = req.body[`q${i}-multi`];
      question["type"] = "multi";
      question["values"] = [
        req.body[`ans${i}-multi_1`],
        req.body[`ans${i}-multi_2`],
        req.body[`ans${i}-multi_3`],
        req.body[`ans${i}-multi_4`],
      ];
    } else if (req.body[`q${i}-txt`]) {
      question[`question`] = req.body[`q${i}-txt`];
      question["type"] = "txt";
    }
    form.push(question);
  }

  User.findByPk(req.session.user.id)
    .then((user) => {
      console.log(user);
      return user.createForm({
        name: req.body["form-name"],
        form_structure: JSON.stringify(form),
      });
    })
    .then((form) => {
      var wb = new xl.Workbook();
      var style = wb.createStyle({
        font: {
          color: "#000000",
          size: 12,
        },
      });
      var ws = wb.addWorksheet("Sheet 1");
      let coulem = 2;
      ws.cell(1, 1).string("userId").style(style);
      for (let i of JSON.parse(form.form_structure)) {
        ws.cell(1, coulem).string(i[`question`]).style(style);
        coulem += 1;
      }
      wb.write(path.join(__dirname, "../", "excel", `${form.id}.xlsx`));
      res.redirect("/form/forms");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getSurvay = (req, res, next) => {
  Form.findOne({ where: { id: Number(req.params.formId) } })
    .then((form) => {
      res.render("survay_ui", {
        questions: JSON.parse(form.form_structure),
        formNum: form.id,
      });
    })
    .catch((err) => console.log(err));
};

exports.postSurvay = (req, res, next) => {
  console.log(req.body);
  const userId = req.session.user.id;
  let form_structure;
  Form.findByPk(req.body.formNum)
    .then((form) => {
      form_structure = JSON.parse(form.form_structure);
      const workbook = new ExcelJS.Workbook();
      workbook.xlsx
        .readFile(
          path.join(__dirname, "../", "excel", `${req.body.formNum}.xlsx`)
        )
        .then(() => {
          const worksheet = workbook.getWorksheet("Sheet 1");
          data = [userId];
          for (i of form_structure) {
            data.push(req.body[i.question]);
          }
          worksheet.addRow(data);
          return workbook.xlsx.writeFile(
            path.join(__dirname, "../", "excel", `${req.body.formNum}.xlsx`)
          );
        })
        .then(() => {
          res.redirect("/form/forms");
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

exports.getForms = (req, res, next) => {
  Form.findAll({ where: { userId: req.session.user.id } })
    .then((forms) => {
      res.render("forms", {
        forms: forms,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
