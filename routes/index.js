const express = require('express')
const router = express.Router()
const User = require('../models/User')
const passport = require('passport')

router.get('/', (req,res) => {
  res.redirect('/auth/login')
})

module.exports = router;