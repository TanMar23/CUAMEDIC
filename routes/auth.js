const express = require('express')
const router = express.Router()
const User = require('../models/User')
const passport = require('passport')
const nodemailer = require('nodemailer')
const {login} = require('../controllers/auth-controllers')
const {getProfile} = require('../controllers/profile-controller')

router.get("/login", (req, res) => {
  res.render("auth-form");
});
router.post("/login", passport.authenticate('local'), login)

router.get('/profile', getProfile)
// router.get("/profile/:id",  async (req, res) => {
//   const { id } = req.params
//   const user = await User.findById(id)
//   console.log(user)
//   res.render("profile", {user});
// });
// router.post("/login", passport.authenticate('local'), login)





router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;