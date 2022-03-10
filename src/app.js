const express = require("express");
const path = require("path");
const cookieSession = require("cookie-session");
const passport = require("passport");
const app = express();

app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/public/html/home.html"));
});

require("dotenv").config();
require("./config/passport");

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ["clave"], //clave para encriptar
  })
);

app.use(passport.initialize());
app.use(passport.session());

module.exports = app;
