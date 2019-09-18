//CRUD DE PACIENTES
const User = require('../models/User')

//////////////////CREATE//////////////////////////
exports.createPatientForm = async (req, res) => {
  res.render('auth/create-patient')
}

exports.createPatient = async (req, res, next) => {
  const {name, lastName, email, fotoPerfil, peso, talla, IMC, porcentajeGrasa, porcentajeMusculo, indiceCinturaCadera, MetabolismoBasalEnReposo, fotosProgreso, descripcion, sexo, password} = req.body

  await User.register({name, lastName, email, fotoPerfil, peso, talla, IMC, porcentajeGrasa, porcentajeMusculo, indiceCinturaCadera, MetabolismoBasalEnReposo, fotosProgreso, descripcion, sexo}, password)
  res.redirect('/auth/pacientes')
}

/////////////////////READ//////////////////////////////
exports.getPacientes = async (req,res,next) => {
  const pacientes =await User.find({role: 'PACIENTE'})
  console.log(pacientes);
  
  res.render('auth/lista', {pacientes})
}

/////////////////UPDATE///////////////////////////////
exports.editPatientForm = async (req,res) => {
  const {id} = req.params
  const user = await User.findById(id)  
  res.render('auth/edit-patient', user)
}
exports.editPatient = async (req,res,next) => {
  const {id} = req.params
  const {name, lastName, email, fotoPerfil, peso, talla, IMC, porcentajeGrasa, porcentajeMusculo, indiceCinturaCadera, MetabolismoBasalEnReposo, fotosProgreso, descripcion, sexo} = req.body
  
  await User.findByIdAndUpdate(id,{name, lastName, email, fotoPerfil, peso, talla, IMC, porcentajeGrasa, porcentajeMusculo, indiceCinturaCadera, MetabolismoBasalEnReposo, fotosProgreso, descripcion, sexo})
  res.redirect('/auth/pacientes')
}

/////////////////////////DELETE//////////////////////////
exports.deletePatient = async (req, res, next) => {
  const {id} = req.params
  const patient = await User.findByIdAndRemove(id) 
  res.redirect('/auth/pacientes')
}