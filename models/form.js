const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Form = sequelize.define("form", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  form_structure: Sequelize.JSON,
});

module.exports = Form;
