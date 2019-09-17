exports.login = (req,res,next) => {
  if(req.user.role === 'MEDICO') {
    res.redirect('/dr-home')
  }
  else if(req.user.role === 'EMPLEADO') {
   res.redirect('/emp-home')
  }else if (req.user.role === 'PACIENTE') {
   res.redirect('/paciente-home')
  } else {
    res.redirect('/auth/login')
  }
}