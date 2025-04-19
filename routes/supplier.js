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

const { Supplier, Log_action } = require("../models/index");

app.use(express.static(path.join(__dirname, "public")));
app.use(expressLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const v = new Validator();
var middlewareAuthJwt = require("../middleware/index");
router.use(middlewareAuthJwt);

router.get("/", async (req, res) => {
  var supplier = await Supplier.findAll();
  // console.log(item);

  res.render("v_supplier", {
    layout: "layout/layoutadmin",
    username: req.username,
    title: "Senang Jaya Abadi",
    activepage: 1,
    message: 0,
    style: 0,
    supplier,
  });
});

router.post("/create", async (req, res) => {
  // console.log(req.body);

  if (req.body.no_supplier != "") {
    const existingSupp = await Supplier.findOne({
      where: { no_supplier: req.body.no_supplier },
    });

    if (existingSupp) {
      req.flash(
        "warning_msg",
        " No Supplier sudah digunakan pada " +
          existingSupp.nama_supplier +
          " !!"
      );
      return res.redirect("/supplier");
    }
  }
  try {
    const newSupp = await Supplier.create(req.body);

    console.log(newSupp);
    await Log_action.create({
      id_user: req.id_user,
      action:
        req.username +
        " Berhasil menambahkan supplier " +
        newSupp.dataValues.name,
      tgl_action: new Date(),
    });
    req.flash(
      "success_msg",
      "Berhasil menambahkan supplier " + newSupp.dataValues.name
    );
    res.redirect("/supplier");
  } catch (err) {
    console.error("Create item error:", err);
    res.status(500).send("Error creating item");
  }
});

router.post("/update", async (req, res) => {
  // console.log(req.body);
  try {
    req.body.id_supplier = parseInt(req.body.id_supplier);

    const supplier = await Supplier.findByPk(req.body.id_supplier);
    if (!supplier) {
      req.flash("warning_msg", "Supplier tidak ditemukan!!");
      return res.redirect("/supplier");
    }
    await supplier.update(req.body);
    req.flash(
      "success_msg",
      req.username + " Berhasil mengubah supplier " + supplier.nama_supplier
    );
    await Log_action.create({
      id_user: req.id_user,
      action:
        req.username + " Berhasil mengubah supplier " + supplier.nama_supplier,
      tgl_action: new Date(),
    });
    res.redirect("/supplier");
  } catch (err) {
    console.error("Update item error:", err);
    res.status(500).send("Error updating item");
  }
});

router.post("/delete", async (req, res) => {
  // console.log(req.body);
  try {
    req.body.id_supplier = parseInt(req.body.id_supplier);
    const supplier = await Supplier.findByPk(req.body.id_supplier);
    if (!supplier) {
      req.flash("warning_msg", "Supplier tidak ditemukan!!");
      return res.redirect("/supplier");
    }
    await supplier.destroy();
    req.flash(
      "success_msg",
      req.username + " Berhasil menghapus supplier " + supplier.nama_supplier
    );
    await Log_action.create({
      id_user: req.id_user,
      action:
        req.username + " Berhasil menghapus supplier " + supplier.nama_supplier,
      tgl_action: new Date(),
    });
    res.redirect("/supplier");
  } catch (err) {
    console.error("Delete item error:", err);
    res.status(500).send("Error deleting item");
  }
});
module.exports = router;
