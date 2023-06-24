const express = require("express");
const authRouter = require("./routes/auth");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "pages", "home")));

app.use("/home", (req, res, next) => {
  res.sendFile(path.join(__dirname, "pages", "home", "home.html"));
});

app.use("/auth", authRouter);

app.listen(4000);
