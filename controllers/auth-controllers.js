const User = require('../models/User')

exports.login = async(req,res,next) => {
 // const loggedUser = req.user
  if(req.user.role === 'MEDICO') {
    //loggedUser.isDr = true
   res.redirect('/auth/profile')
   
  }
  else if(req.user.role === 'EMPLEADO') {
  res.redirect('/auth/profile')

  }else if (req.user.role === 'PACIENTE') {
   res.redirect('/auth/profile')
  } else {
    res.redirect('/auth/login')
  }
}
