const { Sequelize } = require("sequelize");
require("dotenv").config();

const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOSTNAME, DB_DIALECT } =
  process.env;

// Konfigurasi database
const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOSTNAME,
  dialect: DB_DIALECT, // Sesuaikan dengan database yang digunakan
  logging: false, // Maconst { Sequelize } = require("sequelize");
});

module.exports = sequelize;
