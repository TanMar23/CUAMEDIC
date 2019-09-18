const User = require('../models/User')
//Logged in user functions
//Read
exports.getProfile = async(req, res, next) => {
  const id = req.user.id
   const user = await User.findById(id) 
  res.render('auth/profile', user)
}
//Update
//TODO: Form para editar datos del usuario
exports.editProfileForm = async (req,res) => {
  const id = req.user.id
  const user = await User.findById(id) 
  res.render('auth/edit-profile', user)
}
//exports.editProfile = async (req,res,next) => {
//  const id = req.user.id
//  const user = await User.findByIdAndUpdate(id)
//}
//
