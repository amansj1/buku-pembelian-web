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
    req.nama = decoded.nama;
    req.role = decoded.role;
    req.username = decoded.username;
    req.id_company = decoded.id_company;
    req.resetPass = decoded.resetPass;
    req.status = decoded.status;

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
