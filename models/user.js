const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const User = sequelize.define("User", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  email: Sequelize.STRING,
  password: Sequelize.STRING,
});

module.exports = User;