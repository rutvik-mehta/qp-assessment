const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const groceryRoutes = require("./grocery");

router.use("/auth", authRoutes);
router.use("", groceryRoutes);
module.exports = router;
