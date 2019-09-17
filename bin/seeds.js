
const mongoose = require('mongoose')
const User = require('../models/User')
const boss1 = 
  {
    name: 'Emiliano',
    lastName: 'Popoca',
    email: 'emilianopb92@gmail.com',
    role: 'MEDICO',
    fotoPerfil: 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
  }
  const boss2 = 
  {
    name: 'Tania',
    lastName: 'Marin',
    email: 'nicte.tania@gmail.com',
    role: 'MEDICO',
    fotoPerfil: 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
  }


  mongoose
  .connect('mongodb://localhost/proyecto-modulo2', { useNewUrlParser: true })
  .then(async () => {
    const user = await User.register(boss1, boss1.password='123')
    const user1 = await User.register(boss2, boss2.password='123')
    console.log(`Boss created`)
    mongoose.connection.close()
  })
  .catch(err => {
    console.log(err)
  })