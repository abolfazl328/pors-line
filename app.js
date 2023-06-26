const express = require("express");
const authRouter = require("./routes/auth");
const homeRouter = require("./routes/home");
const formMakerRouter = require("./routes/form_maker");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
const sequelize = require("./util/database");
const User = require("./models/user");
const mysql = require("mysql");
const Forms = require("./models/form");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const Session = require("./models/session");

dotenv.config();

const options = {
  host: process.env.host,
  port: process.env.port,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  createDatabaseTable: true,
};

const connection = mysql.createConnection(options);
const sessionStore = new MySQLStore({}, connection);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.secret,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, "pages", "home")));
app.use(express.static(path.join(__dirname, "pages", "register")));
app.use(express.static(path.join(__dirname, "pages", "form_maker")));
app.use(express.static(path.join(__dirname, "responsive")));

app.use("/auth", authRouter);

app.use("/home", homeRouter);

app.use("/form", formMakerRouter);

Forms.belongsTo(User, { constraints: true, onDelete: "CASCADE" });

sequelize
  // .sync({ force: true })
  .sync()
  .then((result) => console.log(result))
  .catch((err) => console.log(err));

app.listen(4000);
