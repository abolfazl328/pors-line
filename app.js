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
const csurf = require("csurf");
const morgan = require("morgan");
const compression = require("compression");
const helmet = require("helmet");
const fs = require("fs");

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

const csrufProtectoin = csurf();

app.set("view engine", "ejs");
app.set("views", "views");

const accessLogStram = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  {
    flags: "a",
  }
);

app.use(helmet());
app.use(compression());
app.use(morgan("combined", { stream: accessLogStram }));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.secret,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(csrufProtectoin);

app.use(express.static(path.join(__dirname)));
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use("/auth", authRouter);

app.use("/form", formMakerRouter);

app.use("/", homeRouter);

Forms.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Forms);

sequelize
  .sync()
  .then((result) => {
    console.log("connected");
    app.listen(4000);
  })
  .catch((err) => console.log(err));
