require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./app/models");
const routes = require("./app/routes");

db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db successfull.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.use(express.json());
app.use("/api", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
