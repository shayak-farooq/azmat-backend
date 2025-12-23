const express = require('express');
const { addToCart, getCart, removeitem,updateQuantity } = require('../controllers/cartController');
const { isAuthorized } = require('../middlewares/IsAuthorized');
const router = express.Router()

router.get('/getcart',isAuthorized,getCart)
router.post('/addtocart',isAuthorized,addToCart)
router.put('/updatequantity/:id',isAuthorized,updateQuantity)
router.delete('/removeitem/:id',isAuthorized,removeitem)
module.exports = router