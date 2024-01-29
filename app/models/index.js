require("dotenv").config();
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user")(sequelize, Sequelize);
db.groceries = require("./grocery")(sequelize, Sequelize);

module.exports = db;
