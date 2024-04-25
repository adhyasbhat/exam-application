// const adminController = require("../Controllers/admincontrollers.js");
const {registerAdmin} = require("../Controllers/admincontrollers.js");

const express = require("express");
const router = express.Router();

router.post("/adminregister",registerAdmin)

module.exports = router;

