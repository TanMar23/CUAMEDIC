const express = require('express')
const router = express.Router()
const User = require('../models/User')
const passport = require('passport')
const nodemailer = require('nodemailer')
const { catchErrors } = require('../middlewares/catchErrors')
const uploadCloud = require('../helpers/cloudinary')
const {login} = require('../controllers/auth-controllers')
const {getProfile, editProfileForm, editProfile} = require('../controllers/profile-controller')
const {getColaboradores,getColab, createColaborador, createColaboradorForm
       ,editColaborador, editColaboradorForm, deleteColaborador} = require('../controllers/colaboradores-controller')

const {createPatientForm, createPatient, getPaciente, getPacientes, addConsultaInfoForm, addConsultaInfo,
   getMiProgreso, editPatientForm, editPatient, deletePatient} = require('../controllers/pacientes-controllers')

router.get("/login", (req, res) => {
  const isLoggedIn = false
  res.render("auth-form", isLoggedIn);
});
router.post("/login", passport.authenticate('local'), catchErrors(login))

router.get('/profile', getProfile)

router.get('/edit-profile',editProfileForm)

router.post('/edit-profile', catchErrors(editProfile))


//RUTAS COLABORADORES
//Read
router.get('/colaboradores', getColaboradores)
router.get('/un-colab/:id', getColab)
//Create
router.get('/create-collaborator', createColaboradorForm)
router.post('/create-collaborator', uploadCloud.single('fotoPerfil'), catchErrors(createColaborador))
//Update
router.get('/edit-colaborador/:id', editColaboradorForm)
router.post('/edit-colaborador/:id', uploadCloud.single('fotoPerfil'), catchErrors( editColaborador))
//Delete
router.post('/delete-colaborador/:id', catchErrors(deleteColaborador))


//RUTAS PACIENTES
//Create
router.get('/create-patient', createPatientForm)
router.post('/create-patient', uploadCloud.single('fotoPerfil'), catchErrors(createPatient))
//Read
router.get('/pacientes', getPacientes)
router.get('/paciente/:id', getPaciente)
//Update
router.get('/edit-patient/:id', editPatientForm)
router.post('/edit-patient/:id', uploadCloud.single('fotoPerfil'), catchErrors(editPatient))
//Delete
router.post('/delete-patient/:id', catchErrors(deletePatient))

//RUTAS MI PROGRESO
router.get('/progreso',getMiProgreso)
router.get('/add-patient-info/:id', addConsultaInfoForm )
router.post('/add-patient-info/:id', addConsultaInfo )



router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/login");
});

module.exports = router;