var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const { Op, Sequelize, where } = require("sequelize");
const sequelize = require("../config/database");
var router = express.Router();
var app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
var expressLayouts = require("express-ejs-layouts");
const { QueryTypes } = require("sequelize");
const Validator = require("fastest-validator");

const { Item, Log_action, Dtl_purchase } = require("../models/index");

app.use(express.static(path.join(__dirname, "public")));
app.use(expressLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const v = new Validator();
var middlewareAuthJwt = require("../middleware/index");
router.use(middlewareAuthJwt);

router.get("/", async (req, res) => {
  res.render("v_supplier", {
    layout: "layout/layoutadmin",
    username: req.username,
    title: "Senang Jaya Abadi",
    activepage: 1,
    message: 0,
    style: 0,
  });
});

module.exports = router;
