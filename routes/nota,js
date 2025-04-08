var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");

var router = express.Router();
var middlewareAuthJwt = require("../middleware/index");
var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
var expressLayouts = require("express-ejs-layouts");
const { QueryTypes } = require("sequelize");

app.use(express.static(path.join(__dirname, "public")));
app.use(expressLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const { Sparepart } = require("../models/index");
router.use(middlewareAuthJwt);

const { sequelize } = require("../models"); // Import instance Sequelize

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("dash", {
    layout: "layout/layoutadmin",
    username: req.username,
    title: "Senang Jaya Abadi",
    activepage: 1,
    message: 0,
    style: 0,
  });
});

module.exports = router;
