const express = require('express')
const router = express.Router()
const User = require('../models/User')
const passport = require('passport')
const nodemailer = require('nodemailer')
const {login} = require('../controllers/auth-controllers')
const {getProfile, editProfileForm, editProfile} = require('../controllers/profile-controller')
const {getColaboradores, createColaborador, createColaboradorForm
       ,editColaborador, editColaboradorForm, deleteColaborador, getColab} = require('../controllers/colaboradores-controller')

const {createPatientForm, createPatient, getPaciente, getPacientes, editPatientForm, editPatient, deletePatient} = require('../controllers/pacientes-controllers')

router.get("/login", (req, res) => {
  res.render("auth-form");
});
router.post("/login", passport.authenticate('local'), login)

router.get('/profile', getProfile)

router.get('/edit-profile',editProfileForm)

router.post('/edit-profile', editProfile)


//RUTAS COLABORADORES
//Read
router.get('/colaboradores', getColaboradores)
router.get('/un-colab/:id', getColab)
//Create
router.get('/create-collaborator', createColaboradorForm)
router.post('/create-collaborator', createColaborador)
//Update
router.get('/edit-colaborador/:id', editColaboradorForm)
router.post('/edit-colaborador/:id', editColaborador)
//Delete
router.post('/delete-colaborador/:id', deleteColaborador)


//RUTAS PACIENTES
//Create
router.get('/create-patient', createPatientForm)
router.post('/create-patient', createPatient)
//Read
router.get('/pacientes', getPacientes)
router.get('/paciente/:id', getPaciente)
//Update
router.get('/edit-patient/:id', editPatientForm)
router.post('/edit-patient/:id', editPatient)
//Delete
router.post('/delete-patient/:id', deletePatient)




router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/login");
});

module.exports = router;