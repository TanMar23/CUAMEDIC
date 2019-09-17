const express = require('express')
const router = express.Router()
const User = require('../models/User')
const passport = require('passport')
const nodemailer = require('nodemailer')
const {login} = require('../controllers/auth-controllers')

router.get("/login", (req, res) => {
  res.render("auth-form", { action: "Login" });
});

//router.get("/register", (req, res) => {
//  res.render("auth-form");
//});

router.post("/login", passport.authenticate('local'), login)


//router.post("/register", (req, res) => {
//  const { password } = req.body;
//  const characters =
//    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
//  let token = "";
//  for (let i = 0; i < 25; i++) {
//    token += characters[Math.floor(Math.random() * characters.length)];
//  }
//  const confirmationCode = token;
//
//  const user = { ...req.body, confirmationCode };
//
//  
//  User.register(user, password)
//    .then(data => {
//      transporter.sendMail({
//        from: "NONAMEYET <noreply@nonameyet.com>",
//        to: data.email,
//        subject: "Confirm Your Account at NONAMEYET",
//        text: `Hello ${data.username} 
//          Please click here to confirm your NONAMEYET account: 
//          ${req.headers.origin}/auth/confirm/${data.confirmationCode}
//          Thank you.`
//      });
//      res.render("email-sent", { data });
//    })
//    .catch(err => {
//      res.render("auth-form", { err });
//    });
//});


//router.get("/confirm/:confirmCode", (req, res) => {
//  User.find({ confirmationCode: req.params.confirmCode }).then(user => {
//    let id = user[0]._id;
//
//    User.findByIdAndUpdate(id, { status: "Active" }, () => {
//      let userEmail = user[0].email;
//      let userId = user[0]._id;
//      res.render("confirm", { userEmail, userId });
//    });
//  });
//});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

//const transporter = nodemailer.createTransport({
//  service: "Gmail",
//  auth: {
//    user: process.env.EMAIL,
//    pass: process.env.PASSWORD
//  }
//});
//
module.exports = router;
