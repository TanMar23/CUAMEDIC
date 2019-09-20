//CRUD DE PACIENTES
const User = require('../models/User')

//////////////////CREATE//////////////////////////
exports.createPatientForm = async (req, res) => {
  const user = req.user;
  const isDr = user.role === 'MEDICO'
  const isColab = user.role === 'EMPLEADO'
  const isPaciente = user.role === 'PACIENTE'
  const isLoggedIn = true
  res.render('auth/create-patient', {user, isDr, isColab, isPaciente, isLoggedIn})
}

exports.createPatient = async (req, res, next) => {
  try{
  const {name, lastName, email, peso, talla, imc, porcentajeGrasa, porcentajeMusculo, icc, mber, /*fotosProgreso*/ descripcion, sexo, password} = req.body
  fotoPerfil =  req.file.url
  password = req.body.password

  //const {name, lastName, email,password,peso, talla, imc, porcentajeGrasa, porcentajeMusculo, icc, mber, foto} = req.body
  //await User.register({name, lastName, email, peso, talla, imc, porcentajeGrasa, porcentajeMusculo, icc, mber, foto}, password)

  await User.register({name, lastName, email, fotoPerfil, peso, talla, imc, porcentajeGrasa, porcentajeMusculo, icc, mber, descripcion, sexo}, password)
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
  const isLoggedIn = true
  res.render('auth/lista', {pacientes,user, isDr, isColab, isPaciente, isLoggedIn})
}
exports.getPaciente = async (req,res,next) => {
  const {id} = req.params
  const paciente = await User.findById(id)
  const user = req.user;
  const isDr = user.role === 'MEDICO'
  const isColab = user.role === 'EMPLEADO'
  const isPaciente = user.role === 'PACIENTE'
  const isLoggedIn = true
  const isGraphView = true
  
res.render('auth/patient-detalle', {paciente, user, isDr, isColab, isPaciente, isLoggedIn, isGraphView})
}

exports.getMiProgreso = (req,res,next) => {
  const { user } = req;
  const isDr = user.role === 'MEDICO'
  const isColab = user.role === 'EMPLEADO'
  const isPaciente = user.role === 'PACIENTE'
  const isLoggedIn = true
  const isGraphView = true
  
  console.log(user)
  res.render('auth/progreso', {user, isDr, isColab, isPaciente, isLoggedIn, isGraphView})
}

/////////////////UPDATE///////////////////////////////
exports.editPatientForm = async (req,res) => {
  const {id} = req.params
  const paciente = await User.findById(id) 
  const user = req.user;
  const isDr = user.role === 'MEDICO'
  const isColab = user.role === 'EMPLEADO'
  const isPaciente = user.role === 'PACIENTE' 
  const isLoggedIn = true
  res.render('auth/edit-patient', {paciente,user, isDr, isColab, isPaciente, isLoggedIn})
}
exports.editPatient = async (req,res,next) => {
  const {id} = req.params
  const {name, lastName, email, peso, talla, IMC, porcentajeGrasa, porcentajeMusculo, indiceCinturaCadera, MetabolismoBasalEnReposo, fotosProgreso, descripcion, sexo} = req.body
  fotoPerfil = req.file ? req.file.url : undefined
  
  await User.findByIdAndUpdate(id,{name, lastName, email, fotoPerfil, peso, talla, IMC, porcentajeGrasa, porcentajeMusculo, indiceCinturaCadera, MetabolismoBasalEnReposo, fotosProgreso, descripcion, sexo})
  res.redirect('/auth/pacientes')
}

/////////////////////////DELETE//////////////////////////
exports.deletePatient = async (req, res, next) => {
  const {id} = req.params
  const patient = await User.findByIdAndRemove(id) 
  res.redirect('/auth/pacientes')
}

///////////////////////INFO PACIENTE//////////////

exports.addConsultaInfoForm = async (req,res,next) => {
  const {id} = req.params
  const paciente = await User.findById(id) 
  console.log(paciente)
  const user = req.user;
  const isDr = user.role === 'MEDICO'
  const isColab = user.role === 'EMPLEADO'
  const isPaciente = user.role === 'PACIENTE' 
  const isLoggedIn = true
  res.render('auth/add-patient-info-form', {paciente,user, isDr, isColab, isPaciente, isLoggedIn})
}

exports.addConsultaInfo = async (req,res,next) => {
  const {id} = req.params
  const paciente = await User.findById(id)
  const {peso, talla, imc, porcentajeGrasa, porcentajeMusculo, icc, mber, foto} = req.body
  
  paciente.peso.push(peso)
  paciente.talla.push(talla)
  paciente.IMC.push(imc)
  paciente.porcentajeGrasa.push(porcentajeGrasa)
  paciente.porcentajeMusculo.push(porcentajeMusculo)
  paciente.indiceCinturaCadera.push(icc)
  paciente.MetabolismoBasalEnReposo.push(mber)
  paciente.fotosProgreso.push(foto)

  await paciente.save()
  res.redirect(`/auth/paciente/${id}`)
}