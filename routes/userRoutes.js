const express = require('express');
const router = express.Router()
const {handleSignup,verifySignupOtp,handleLogin,handleForgetPassword,verifyForgetOtp} = require('../controllers/userController')
//signup routes
router.post('/signup',handleSignup)
router.post('/verifysignupotp',verifySignupOtp)
//login route
router.post('/login',handleLogin)
//forget password routes
router.post('/forgetpassword',handleForgetPassword)
router.post('/verifyforgetotp',verifyForgetOtp)

module.exports = router