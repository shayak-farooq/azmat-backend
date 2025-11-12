const express = require('express');
const router = express.Router()
const {handleSignup} = require('../controllers/userController')

router.get("/",( req , res ) => {
    res.send("Hello world")
})
router.post('/',handleSignup)
module.exports = router