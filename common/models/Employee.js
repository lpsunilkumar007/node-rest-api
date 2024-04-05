const { DataTypes } = require("sequelize");
const { roles } = require("../../config");

const EmployeeModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  }
};

module.exports = {
  initialise: (sequelize) => {
    this.model = sequelize.define("employee", EmployeeModel);
  },
  getAll: () => {
    return this.model.findAll();
  }
};