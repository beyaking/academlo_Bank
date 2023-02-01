const { DataTypes } = require("sequelize");
const { db } = require("../database/config");

const Transfer = db.define("transfer", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },

  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  senderUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  receiverUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Transfer;
