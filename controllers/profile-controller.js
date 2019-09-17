const User = require('../models/User')

exports.getProfile = async(req, res, next) => {
  const id = req.user.id
   const user = await User.findById(id) 
  res.render('auth/profile', user)
}