var createError = require("http-errors");
var express = require("express");
var session = require("express-session");
var flash = require("connect-flash");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const helmet = require("helmet");

var authRouter = require("./routes/auth");
var app = express();

app.disable("x-powered-by");
const http = require("http");

const PORT = process.env.PORT;

app.get("/", (req, res) => res.redirect("/login"));
app.use(
  helmet({
    hidePoweredBy: true, // Sembunyikan "X-Powered-By"
    frameguard: { action: "deny" }, // Cegah clickjacking
    xssFilter: true, // Aktifkan XSS protection
    noSniff: true, // Mencegah MIME sniffing
    ieNoOpen: true, // Cegah IE dari membuka file sebagai download otomatis
    referrerPolicy: { policy: "no-referrer" }, // Hapus header Referrer
    contentSecurityPolicy: false, // Matikan CSP jika ada konflik
  }),
  session({
    secret: "Aman_sejahtera-secret-key-&#@(^(",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 30 * 60 * 1000, // **Session expired dalam 30 menit**
      secure: false, // Set true jika menggunakan HTTPS
      httpOnly: true,
    },
  })
);

app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg")[0];
  res.locals.warning_msg = req.flash("warning_msg")[0];
  res.locals.error_msg = req.flash("error_msg")[0];
  res.locals.session = req.session;

  next();
});
app.get("/login", (req, res) => {
  res.clearCookie("token");

  res.render("login", {
    layout: "layout/layoutkosong",
  });
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
