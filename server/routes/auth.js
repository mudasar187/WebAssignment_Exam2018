const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const User = require("../database/models/user");
const passport = require("../passport");
const secretToken = require("../config/jwtSecret");

/*
 * Sign up user
 */
router.post("/signup", (req, res) => {
  console.log("user signup");

  const { name, password } = req.body;
  // ADD VALIDATION
  User.findOne({ name: name }, (err, user) => {
    if (err) {
      console.log("User.js post error: ", err);
    } else if (user) {
      res.json({
        error: `Sorry, already a user with the name: ${name}`
      });
    } else {
      const newUser = new User({
        name: name,
        password: password
      });
      newUser.save((err, savedUser) => {
        if (err) return res.json(err);
        res.json(savedUser);
      });
    }
  });
});

/*
 * Login user
 */
router.post(
  "/login",
  function(req, res, next) {
    console.log("routes/user.js, login, req.body: ");
    console.log(req.body);
    next();
  },
  passport.authenticate("local"),
  (req, res) => {
    const token = jwt.sign({ sub: req.user._id }, secretToken.jwtSecret);
    return res.status(200).json({
      token: token
    });
  }
);

/*
 * Check user auth
 */
router.get("/check", (req, res, next) => {
  if (req.user) {
    res.json({ isAuthenticated: true });
  } else {
    res.json({ isAuthenticated: false });
  }
});

/*
 * Log out user
 */
router.post("/logout", (req, res) => {
  if (req.user) {
    req.logout();
    res.send({ msg: "logging out" });
  } else {
    res.send({ msg: "no user to log out" });
  }
});

module.exports = router;
