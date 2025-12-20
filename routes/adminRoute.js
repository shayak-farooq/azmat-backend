const express = require('express');
const router = express.Router()
const {adminlogin} = require('../controllers/adminController');
const { isAdmin, isAuthorized } = require('../middlewares/IsAuthorized');

router.get("/login",isAuthorized,isAdmin,adminlogin)
module.exports = router