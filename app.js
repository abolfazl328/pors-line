const express = require("express");
const authRouter = require("./routes/auth");
const homeRouter = require("./routes/home");
const formMakerRouter = require("./routes/form_maker");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
const sequelize = require("./util/database");
const User = require("./models/user");
const Forms = require("./models/forms");

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname)));

app.use(express.static(path.join(__dirname, "pages", "home")));

app.use(express.static(path.join(__dirname, "pages", "form_maker")));

app.use(express.static(path.join(__dirname, "pages", "responsive")));

app.use("/auth", authRouter);

app.use("/home", homeRouter);

app.use("/form", formMakerRouter);

Forms.belongsTo(User, { constraints: true, onDelete: "CASCADE" });

sequelize
  .sync()
  .then((result) => console.log(result))
  .catch((err) => console.log(err));

app.listen(4000);
