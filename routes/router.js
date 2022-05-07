"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("../controller/ctrl");

router.get("/", ctrl.output.main);
router.get("/login", ctrl.output.login);
router.get("/signup", ctrl.output.signup);
router.get("/logout", ctrl.output.logout);
router.get("/find", ctrl.output.find);
router.get("/find_id", ctrl.output.find_id);
router.get("/find_pw", ctrl.output.find_pw);

router.post("/login", ctrl.process.login);
router.post("/signup", ctrl.process.signup);
router.post("/find_id", ctrl.process.find_id);
router.post("/find_pw", ctrl.process.find_pw);
router.post("/change_pw", ctrl.process.change_pw);

module.exports = router;