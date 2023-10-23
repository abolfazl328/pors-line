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
    type: Sequelize.STRING(90),
    allowNull: false,
  },
  form_structure: Sequelize.TEXT("long"),
});

module.exports = Form;
