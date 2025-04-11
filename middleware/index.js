const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const { Users } = require("../models");

module.exports = async (req, res, next) => {
  let token = req.cookies.token;

  if (!token) {
    console.log("token not found wee");
    return res.redirect("/login");
  }

  try {
    var decoded = jwt.verify(token, config.secret);

    var us1 = await Users.findOne({
      attributes: ["status", "resetPass"],
      where: {
        id_user: decoded.id_user,
      },
    });

    req.id_user = decoded.id_user;
    req.nama = decoded.nama;
    req.role = decoded.role;
    req.username = decoded.username;
    req.id_company = decoded.id_company;
    req.resetPass = decoded.resetPass;
    req.status = decoded.status;

    if (req.status == "INACTIVE" || us1.status == "INACTIVE") {
      req.flash("warning_msg", "Username tidak aktif silahkan hubungi admin!!");
      res.clearCookie("cookies");
      res.clearCookie("token");
      return res.redirect("/login");
    }

    if (req.resetPass == 1 || us1.resetPass == 1) {
      req.session.resetUserId = decoded.id_user;
      return res.redirect("/auth/login_repass");
    }
    next();
  } catch (err) {
    // err

    // console.log(err);
    res.clearCookie("cookies");

    return res.redirect("/login");
  }
};
