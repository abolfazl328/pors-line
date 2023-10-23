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
    type: Sequelize.STRING(90),
    allowNull: false,
    unique: true,
  },
  password: { type: Sequelize.STRING(90), allowNull: false },

  validation_code: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
  },
  validated: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  resetToken: Sequelize.STRING(90),
  resetTokenExpiration: Sequelize.DATE(),
});

module.exports = User;
