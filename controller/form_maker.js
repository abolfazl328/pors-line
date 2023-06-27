const path = require("path");
const User = require("../models/user");

exports.getFormMaker = (req, res, next) => {
  res.sendFile(
    path.join(__dirname, "../", "pages", "form_maker", "form_maker.html")
  );
};

exports.postFormMaker = (req, res, next) => {
  let num = Number(req.body.hiddenInput);
  let form = [];
  for (let i = 0; i < num; i++) {
    let question = {};
    if (req.body[`q${i}-multi`]) {
      question[`question${i}`] = req.body[`q${i}-multi`];
      question["type"] = "multi";
      question["values"] = [
        req.body[`ans${i}-multi_1`],
        req.body[`ans${i}-multi_2`],
        req.body[`ans${i}-multi_3`],
        req.body[`ans${i}-multi_4`],
      ];
    } else if (req.body[`q${i}-txt`]) {
      question[`question${i}`] = req.body[`q${i}-txt`];
      question["type"] = "txt";
    }
    form.push(question);
  }

  //
  User.findByPk(1)
    .then((user) => {
      return user.createForm({
        name: req.body["form-name"],
        form_structure: JSON.stringify(form),
      });
    })
    .then(() => {
      res.redirect("/home");
    })
    .catch((err) => {
      console.log(err);
    });
  //

  // req.session.user
  //   .creatForm({
  //     name: req.body["form-name"],
  //     form_structure: JSON.stringify(form),
  //   })
  //   .then(() => {
  //     res.redirect("/home");
  //   })
  //   .catch((err) => console.log(err));
};
