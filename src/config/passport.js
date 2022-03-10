const passport = require("passport");
const users = require("../models/User");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser(function (user, done) {
  done(null, user.googleId);
});

passport.deserializeUser(function (id, done) {
  users
    .find(id)
    .then((user) => done(null, user))
    .catch((err) => done(err));
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      console.log("working");
      console.log("accessToken", accessToken);
      console.log("refreshToken", refreshToken);
      console.log("profile", profile);
      users
        .find(profile.id)
        .then((currentUser) => {
          if (currentUser) {
            done(null, currentUser);
          } else {
            const newUser = {
              googleId: `${profile.id}`,
              name: `${profile.displayName}`,
              email: `${profile._json.email}`,
              imageUrl: `${profile._json.picture}`,
            };
            users.create(newUser);
            done(null, newUser);
          }
        });
    }
  )
);
