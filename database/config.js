const { Sequelize } = require("sequelize");

const db = new Sequelize({
  dialect: "postgres",
  host: "localhost", //direccion donde se encuentra la base de datos
  username: "postgres", //usuario por defecto postgre
  password: "Wevo02xp?", //contraseña que se digita en postgre
  database: "bank_project", //nombre de la base de datos
  logging: false,
});

module.exports = { db };
