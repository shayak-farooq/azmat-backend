const express = require('express');
const router = express.Router()
const {adminlogin , getOrders, singleOrder,updateOrder} = require('../controllers/adminController');

router.get("/login",adminlogin)
//orders
router.get('/orders',getOrders)
router.get('/singleorder/:id',singleOrder)
router.put('/singleorder/:id',updateOrder)
module.exports = router