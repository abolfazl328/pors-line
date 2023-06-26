const express = require("express");
const authRouter = require("./routes/auth");
const homeRouter = require("./routes/home");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname)));

app.use(express.static(path.join(__dirname, "pages", "home")));

app.use("/auth", authRouter);

app.use("/home", homeRouter);

app.listen(4000);
