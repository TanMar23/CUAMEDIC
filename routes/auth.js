const express = require('express')
const router = express.Router()
const User = require('../models/User')
const passport = require('passport')
const nodemailer = require('nodemailer')
const {login} = require('../controllers/auth-controllers')
const {getProfile, editProfileForm} = require('../controllers/profile-controller')

router.get('/', (req, res, next) => {
  res.redirect('/auth/login');
});

router.get("/login", (req, res) => {
  res.render("auth-form");
});
router.post("/login", passport.authenticate('local'), login)

router.get('/profile', getProfile)

router.get('/edit-profile',editProfileForm)





router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;