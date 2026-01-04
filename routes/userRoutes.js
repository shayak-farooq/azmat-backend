const express = require('express');
const router = express.Router()
const {handleSignup,verifySignupOtp,handleLogin,handleForgetPassword,verifyForgetOtp,handleProfile,addAddress,deleteAddress,updateAddress, updatePassword} = require('../controllers/userController');
const { isAuthorized } = require('../middlewares/IsAuthorized');
// profle route
router.get('/profile',isAuthorized,handleProfile)
// address routes
router.post('/address',isAuthorized,addAddress)
router.delete('/address/:id',isAuthorized,deleteAddress)
router.put('/address/:id',isAuthorized,updateAddress)
//signup routes
router.post('/signup',handleSignup)
router.post('/verifysignupotp',verifySignupOtp)
//login route
router.post('/login',handleLogin)
//forget password routes
router.post('/forgetpassword',handleForgetPassword)
router.post('/verifyforgetotp',verifyForgetOtp)
router.post('/updatepassword',updatePassword)

module.exports = router