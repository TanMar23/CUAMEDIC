const User = require('../models/User')

//Create
exports.createColaboradorForm = (req,res) => {
  const user = req.user;
  const isLoggedIn = true
  const isDr = user.role === 'MEDICO'
  const isColab = user.role === 'EMPLEADO'
  const isPaciente = user.role === 'PACIENTE'
  res.render('auth/create-form', {user,isLoggedIn, isDr, isColab, isPaciente})
}
exports.createColaborador = async (req,res) => {
  try{
    const {name, lastName, email, password} = req.body
  const user = await User.register({name, lastName, email, role: 'EMPLEADO'}, password)
  res.redirect('/auth/colaboradores')
  }
  catch(error){
    console.log(error)
    if(error.name === 'UserExistsError'){
      error = {...error, message: 'Ya hay un usuario registrado con ese email'}
    }
    res.render('auth/create-form', {error})
  }
}
  
  

//Read
exports.getColaboradores = async (req,res,next) => {
  const users =await User.find({role: 'EMPLEADO'})
  const user = req.user;
  const isLoggedIn = true
  const isDr = user.role === 'MEDICO'
  const isColab = user.role === 'EMPLEADO'
  const isPaciente = user.role === 'PACIENTE'
    res.render('auth/lista', {users, user, isDr, isColab, isPaciente, isLoggedIn})
}
exports.getColab = async (req,res,next) => {
  const {id} = req.params
  const colab = await User.findById(id)
  const user = req.user;
  const isLoggedIn = true
  const isDr = user.role === 'MEDICO'
  const isColab = user.role === 'EMPLEADO'
  const isPaciente = user.role === 'PACIENTE'
  res.render('auth/detalle-colab', {colab, user,isLoggedIn, isDr, isColab, isPaciente})
}

//Update
exports.editColaboradorForm = async (req,res) => {
  const {id} = req.params
  const colab = await User.findById(id)
  const user = req.user;
  const isLoggedIn = true
  const isDr = user.role === 'MEDICO'
  const isColab = user.role === 'EMPLEADO'
  const isPaciente = user.role === 'PACIENTE'
  res.render('auth/edit-colaborador', {colab,user,isLoggedIn, isDr, isColab, isPaciente})
  }
  
exports.editColaborador = async (req,res,next) => {
  const {name, lastName, email} = req.body
  const {id} = req.params
  await User.findByIdAndUpdate(id,{ name, lastName, email})
  res.redirect('/auth/colaboradores')
}

//Delete
exports.deleteColaborador = async (req,res,next) => {
  const {id} = req.params
  const user = await User.findByIdAndRemove(id) 
  res.redirect('/auth/colaboradores')
}