const express = require('express');
const { getOrders, PlaceOrder,handlStock } = require('../controllers/orderController');
const { isAuthorized } = require('../middlewares/IsAuthorized');
const router=express.Router()

router.get("/",isAuthorized,getOrders)
router.post('/',isAuthorized,PlaceOrder,handlStock)
module.exports=router