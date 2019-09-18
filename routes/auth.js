const express = require('express')
const router = express.Router()
const User = require('../models/User')
const passport = require('passport')
const nodemailer = require('nodemailer')
const {login} = require('../controllers/auth-controllers')
const {getProfile, editProfileForm, editProfile} = require('../controllers/profile-controller')
const {getColaboradores, createColaborador, createColaboradorForm
       ,editColaborador, editColaboradorForm, deleteColaborador} = require('../controllers/colaboradores-controller')

router.get("/login", (req, res) => {
  res.render("auth-form");
});
router.post("/login", passport.authenticate('local'), login)

router.get('/profile', getProfile)

router.get('/edit-profile',editProfileForm)

router.post('/edit-profile', editProfile)
//colaboradores
//Read
router.get('/colaboradores', getColaboradores)
//Create
router.get('/create-collaborator', createColaboradorForm)
router.post('/create-collaborator', createColaborador)
//Update
router.get('/edit-colaborador/:id', editColaboradorForm)
router.post('/edit-colaborador/:id', editColaborador)
//Delete
router.post('/delete-colaborador/:id', deleteColaborador)





router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;