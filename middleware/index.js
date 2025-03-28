const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

module.exports = async (req, res, next) => {
  let token = req.cookies.token;

  if (!token) {
    console.log("token not found wee");
    return res.redirect("/login");
  }

  console.log("haii");

  try {
    var decoded = jwt.verify(token, config.secret);

    req.id_user = decoded.id_user;
    req.id_role = decoded.id_role;
    req.username = decoded.username;
    req.id_company = decoded.id_company;
    req.isPusat = decoded.isPusat;
    req.resetPass = decoded.resetPass;
    req.id_gudang = decoded.id_gudang;

    console.log(req.resetPass);
    if (req.resetPass == 1) {
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
