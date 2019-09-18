const mongoose = require('mongoose')
const User = require('../models/User')
// const Paciente = require('../models/Paciente')


const boss1 = 
  {
    name: 'Emiliano',
    lastName: 'Popoca',
    email: 'emilianopb92@gmail.com',
    role: 'MEDICO',
    fotoPerfil: 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png',
    educacion: 'Loquesea',
    experiencia: 'Loquesea'
  }
  const boss2 = 
  {
    name: 'Tania',
    lastName: 'Marin',
    email: 'nicte.tania@gmail.com',
    role: 'MEDICO',
    fotoPerfil: 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png',
    educacion: 'Loquesea',
    experiencia: 'Loquesea'
  }
  const employee =
  {
    name: 'Andres',
    lastName: 'Henao',
    email: 'andres.henao@gmail.com',
    role: 'EMPLEADO',
    fotoPerfil: 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
  }

  const patient =
  {
    name: 'Felipe',
    lastName: 'Payan',
    email: 'felipe.payan@gmail.com',
    role: 'PACIENTE',
    fotoPerfil: 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png',
    peso: [70],
    talla: [40],
    IMC: [50],
    porcentajeGrasa: [20],
    porcentajeMusculo: [50],
    indiceCinturaCadera: [12],
    MetabolismoBasalEnReposo: [10],
    fotosProgreso: ['http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'],
    descripcion: 'asdfghjkjhgfczxvcbngmfntgdfc',
    sexo: 'Masculino',
  }


  mongoose
  .connect('mongodb://localhost/proyecto-modulo2', { useNewUrlParser: true })
  .then(async () => {
    const user = await User.register(boss1, boss1.password='123')
    const user1 = await User.register(boss2, boss2.password='123')
    const user3 = await User.register(employee, employee.password='123')
    const user4 = await User.register(patient, patient.password='123')
    console.log(`Boss created`)
    mongoose.connection.close()
  })
  .catch(err => {
    console.log(err)
  })