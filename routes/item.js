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
  var item = await Item.findAll();

  console.log(item);
  res.render("v_item", {
    layout: "layout/layoutadmin",
    username: req.username,
    title: "Senang Jaya Abadi",
    activepage: 1,
    message: 0,
    style: 0,
    item,
  });
});

router.post("/create", async (req, res) => {
  // console.log(req.body);
  const existingItem = await Item.findOne({
    where: { no_item: req.body.no_item },
  });

  if (existingItem) {
    req.flash(
      "warning_msg",
      " No Bahan baku sudah digunakan pada " + existingItem.nama_item + " !!"
    );
    return res.redirect("/item");
  }
  try {
    const newItem = await Item.create(req.body);

    await Log_action.create({
      id_user: req.id_user,
      action:
        req.username + " Berhasil menambahkan bahan baku" + newItem.nama_item,
      tgl_action: new Date(),
    });
    req.flash(
      "success_msg",
      req.username +
        " Berhasil menambahkan bahan baku" +
        newItem.nama_item +
        " baru!!"
    );
    res.redirect("/item");
  } catch (err) {
    console.error("Create item error:", err);
    res.status(500).json({ error: "Failed to create item" });
  }
});

router.post("/delete", async (req, res) => {
  // console.log(req.body);
  try {
    req.body.id_item = parseInt(req.body.id_item);
    const item = await Item.findByPk(req.body.id_item);
    var itemUsed = await Dtl_purchase.findOne({
      where: { id_item: req.body.id_item },
    });
    var itemUsed2 = await Harga_supplier.findOne({
      where: { id_item: req.body.id_item },
    });
    if (!item) {
      req.flash("warning_msg", " Item tidak ditemukan");
      return res.redirect("/item");
    }
    if (itemUsed || itemUsed2) {
      req.flash(
        "warning_msg",
        " Item tidak bisa dihapus karena sudah digunakan pada transaksi lain"
      );
      return res.redirect("/item");
    }
    await item.destroy();
    req.flash(
      "success_msg",
      req.username + " Berhasil menghapus bahan baku " + item.nama_item + "!!"
    );
    await Log_action.create({
      id_user: req.id_user,
      action: req.username + " Berhasil menghapus bahan baku " + item.nama_item,
      tgl_action: new Date(),
    });
    res.redirect("/item");
  } catch (err) {
    console.error("Delete item error:", err);
    res.status(500).json({ error: "Failed to delete item" });
  }
});

router.post("/update", async (req, res) => {
  // console.log(req.body);
  try {
    req.body.id_item = parseInt(req.body.id_item);
    const item = await Item.findByPk(req.body.id_item);
    if (!item) {
      req.flash("warning_msg", " Item tidak ditemukan");
      return res.redirect("/item");
    }
    await item.update(req.body);
    req.flash(
      "success_msg",
      req.username + " Berhasil memperbarui bahan baku " + item.nama_item + "!!"
    );
    await Log_action.create({
      id_user: req.id_user,
      action: req.username + " Berhasil mengubah bahan baku " + item.nama_item,
      tgl_action: new Date(),
    });
    res.redirect("/item");
  } catch (err) {
    console.error("Update item error:", err);
    res.status(500).json({ error: "Failed to update item" });
  }
});

module.exports = router;
