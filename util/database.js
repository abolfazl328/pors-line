const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.data_base,
  process.env.user,
  process.env.password,
  {
    host: process.env.host,
    dialect: "mysql",
  }
);

module.exports = sequelize;
