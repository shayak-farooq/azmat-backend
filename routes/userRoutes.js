const express = require('express');
const router = express.Router()
const {handleSignup,verifySignupOtp,handleLogin,handleForgetPassword,verifyForgetOtp,handleProfile} = require('../controllers/userController');
const { isAuthorized } = require('../middlewares/IsAuthorized');
// profle route
router.get('/profile',isAuthorized,handleProfile)
//signup routes
router.post('/signup',handleSignup)
router.post('/verifysignupotp',verifySignupOtp)
//login route
router.post('/login',handleLogin)
//forget password routes
router.post('/forgetpassword',handleForgetPassword)
router.post('/verifyforgetotp',verifyForgetOtp)

module.exports = router