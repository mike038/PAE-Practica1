const router = require("express").Router();
const passport = require("passport");
const path = require("path");

// path: auth/

// GET /login
router.get("/login", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../public/html/login.html"));
});
// GET /google/login
router.get(
  "/google/login",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// GET /google/callback
router.get("/google/callback", passport.authenticate('google'), (req, res) => {
  console.log(req.query.code);
  res.status(200).redirect('/');
});

// GET /verifyLogin
router.get("/verifyLogin", (req, res) => {
  if(!req.user){
    res.status(401).send();
  }else{
    res.status(200).send();
  }
});

// GET /logout
router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect('/');
});

module.exports = router;
