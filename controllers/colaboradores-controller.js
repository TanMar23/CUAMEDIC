const User = require('../models/User')

//Create
exports.createColaboradorForm = (req,res) => {
  res.render('auth/create-form')
}
exports.createColaborador = async (req,res) => {
  const {name, lastName, email, password} = req.body
  const user = await User.register({name, lastName, email}, password)
  res.redirect('/auth/colaboradores')
}
//Read
exports.getColaboradores = async (req,res,next) => {
  const users =await User.find({role: 'EMPLEADO'})
  res.render('auth/lista', {users})
}

//Update
exports.editColaboradorForm = async (req,res) => {
  const {id} = req.params
  const user = await User.findById(id) 
  res.render('auth/edit-colaborador', user)
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