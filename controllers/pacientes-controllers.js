//CRUD DE PACIENTES
const User = require('../models/User')

//////////////////CREATE//////////////////////////
exports.createPatientForm = async (req, res) => {
  res.render('auth/create-patient')
}

exports.createPatient = async (req, res, next) => {
  try{
  const {name, lastName, email, fotoPerfil, peso, talla, IMC, porcentajeGrasa, porcentajeMusculo, indiceCinturaCadera, MetabolismoBasalEnReposo, fotosProgreso, descripcion, sexo, password} = req.body

  await User.register({name, lastName, email, fotoPerfil, peso, talla, IMC, porcentajeGrasa, porcentajeMusculo, indiceCinturaCadera, MetabolismoBasalEnReposo, fotosProgreso, descripcion, sexo}, password)
  res.redirect('/auth/pacientes')
  }
  catch(error){
    console.log(error)
    if(error.name === 'UserExistsError'){
      error = {...error, message: 'Ya hay un usuario registrado con ese email'}
    }
    res.render('auth/create-patient', {error})
  }
}

/////////////////////READ//////////////////////////////
exports.getPacientes = async (req,res,next) => {
  const pacientes =await User.find({role: 'PACIENTE'})
  const user = req.user;
  const isDr = user.role === 'MEDICO'
  const isColab = user.role === 'EMPLEADO'
  const isPaciente = user.role === 'PACIENTE'
  res.render('auth/lista', {pacientes,user, isDr, isColab, isPaciente})
}
exports.getPaciente = async (req,res,next) => {
  const {id} = req.params
  const paciente = await User.findById(id)
  
res.render('auth/patient-detalle', paciente)
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