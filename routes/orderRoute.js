const express = require('express');
const { getOrders, PlaceOrder } = require('../controllers/orderController');
const { isAuthorized } = require('../middlewares/IsAuthorized');
const router=express.Router()

router.get("/",isAuthorized,getOrders)
router.post('/',isAuthorized,PlaceOrder)
module.exports=router