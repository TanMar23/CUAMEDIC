const User = require('../models/User')
//Logged in user functions
//Read
exports.getProfile = async(req, res, next) => {
  const id = req.user.id
   const user = await User.findById(id) 
  res.render('auth/profile', user)
}
//Update
//TODO: Darle estilos al formulario
exports.editProfileForm = async (req,res) => {
  const id = req.user.id
  const user = await User.findById(id) 
  res.render('auth/edit-profile', user)
}
exports.editProfile = async (req,res,next) => {
  const {name, lastName, email} = req.body
  console.log(req.body)
  await User.findByIdAndUpdate(req.user.id,{ name, lastName, email})
  res.redirect('/auth/profile')
}

exports.getColaboradores = async (req,res,next) => {
  const users =await User.find({role: 'EMPLEADO'})
  console.log('=====================================' + users);
  
  res.render('auth/lista', {users})

}

