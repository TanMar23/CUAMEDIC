const User = require('../models/User')


exports.login = async(req,res,next) => {
  if(req.user.role === 'MEDICO') {
   const {dr} = await User.findById(req.user.id) 
   res.redirect('/profile')
  }
  else if(req.user.role === 'EMPLEADO') {
  // const employee = await User.findById(req.user.id)
   res.redirect('/profile') //{employee})
   console.log(req.user.role);

  }else if (req.user.role === 'PACIENTE') {
    // const patient = await Paciente.findById(req.user.id)
   res.redirect('/profile')//, {patient})
   console.log(req.user.role);
  } else {
    res.redirect('/auth/login')
  }
}

//NAVBAR HACEMOS CONDICIONES
//NO redirigir a diretentes rutas, todas a profile
//todas la misma vista
