var express = require("express");
var router = express.Router();
const Validator = require("fastest-validator");
const { QueryTypes, where } = require("sequelize");
const { sequelize, db } = require("../models");
const v = new Validator();
const { Users, Log_action } = require("../models");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var config = require("../config/auth.config");
1;
// const middlewareAuthJwt = require("../middleware/index");
var middlewareAuthJwt = require("../middleware/index");
// router.use(middlewareAuthJwt.verifyToken);
var app = express();
var path = require("path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
var expressLayouts = require("express-ejs-layouts");
const { reset } = require("nodemon");
app.use(express.static(path.join(__dirname, "public")));
app.use(expressLayouts);

router.get("/login_repass", (req, res) => {
  if (!req.session.resetUserId) {
    return res.redirect("/login");
  }

  res.render("login_repass", {
    layout: false,
    id_user: req.session.resetUserId,
  });
});

router.post("/repass", async (req, res) => {
  const id_user = parseInt(req.body.id_user); //req.body.id_user;
  const nama = req.body.nama;
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  const password = req.body.password;
  const confirm_password = req.body.confirm_password;
  if (password !== confirm_password) {
    req.flash("error_msg", "Password tidak sama!!");
    req.flash("style", "danger");
    res.redirect("/login");
  }
  try {
    await Users.update(
      {
        password: password,
        nama: nama,
        resetPass: false,
      },
      {
        where: {
          id_user: id_user,
        },
      }
    );
    res.redirect("/login");
  } catch (error) {
    console.log(error);
  }
});

router.get("/signout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.send("Gagal logout.");
    } else {
      res.redirect("/login");
    }
  });
});
router.get("/reg", middlewareAuthJwt, async (req, res) => {
  console.log(parseInt(req.id_user));
  if (req.role != "Super") {
    res.redirect("/dashboard");
  } else {
    console.log("ini reg");
    res.render("signup", { layout: false });
  }
});
router.get("/signin", (req, res) => {
  res.redirect("/login");
});
router.post("/signin", async (req, res) => {
  // console.log(req.body);
  const schema = {
    username: "string|optional",
    password: "string|optional",
  };
  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json(validate);
  }

  const user = await Users.findOne({
    where: {
      username: req.body.username,
    },
  });

  // console.log(user);
  if (!user) {
    // console.log('Username tidak terdaftar!!');
    req.flash("error_msg", "Username tidak terdaftar!!");
    req.flash("style", "danger");
    // console.log(req.flash);
    res.redirect("/login");
  } else {
    if (user.status == "INACTIVE") {
      req.flash("warning_msg", "Username tidak aktif silahkan hubungi admin!!");
      // console.log(req.flash);
      res.redirect("/login");
    }
    const passwordIsValid = await bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (passwordIsValid) {
      var token = jwt.sign(
        {
          id_user: user.id_user,
          nama: user.nama,
          username: user.username,
          role: user.role,
          id_company: user.id_company,
          resetPass: user.resetPass,
          status: user.status,
        },
        config.secret,
        {
          // expiresIn: "600s",
          expiresIn: "1d",
        }
      );

      // console.log(user.resetPass);
      console.log("token", token);
      res.cookie("token", token, {
        httpOnly: true,
      });

      req.session.user = { isPusat: user.isPusat };
      await Log_action.create({
        id_user: user.id_user,
        action: user.username + " LOGIN masuk kedalam sistem",
        tgl_action: new Date(),
      });
      req.flash("success_msg", user.username + " Berhasil Login!!");
      // console.log(req.flash('success_msg')[0]);
      return res.redirect("/dashboard");
    } else {
      console.log("invalid pass");
      req.flash("error_msg", "Password salah tidak terdaftar!!");

      res.redirect("/login");
    }
  }
});

// router.get("/deactive/:id", async (req, res) => {
//   const id = req.params.id;
//   const user = await Users.findByPk(id);

//   await user.update({
//     status: "INACTIVE",
//   });
//   return res.redirect("/auth/list");
// });

// router.get("/repass", async (req, res) => {
//   res.render("login_repass", { layout: false });
// });

// router.post("/repass", async (req, res) => {});

router.post("/signup", async (req, res) => {
  if (!req.role == "Super") {
    res.redirect("/");
  }

  req.body.status = "ACTIVE";
  req.body.password = bcrypt.hashSync(req.body.password, 10);

  try {
    var user = await Users.create({
      username: req.body.username,
      role: req.body.role,
      nama: req.body.nama,
      password: req.body.password,
      status: req.body.status,
      id_company: req.body.id_company,
      resetPass: true,
    });
    console.log(user);
    console.log(req);

    await Log_action.create({
      id_user: req.id_user,
      action:
        req.username + " REGISTER " + req.body.nama + " masuk kedalam sistem",
      tgl_action: new Date(),
    });
    if (user) {
      req.flash("success_msg", "User registered successfully! Please Login!");
      res.redirect("/dashboard");
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({
      message: err.errors.message,
    });
  }
});

module.exports = router;
