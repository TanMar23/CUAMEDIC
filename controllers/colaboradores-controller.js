const User = require('../models/User')

//Create
exports.createColaboradorForm = (req,res) => {
  res.render('auth/create-form')
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
  const {user: loggedUser} = req
  console.log(loggedUser.role)
  res.render('auth/lista', {users, loggedUser})
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