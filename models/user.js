const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: { type: Sequelize.STRING, allowNull: false },

  validation_code: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
  },
  validated: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});

module.exports = User;
