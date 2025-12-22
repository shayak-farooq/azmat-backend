const express = require('express');
const { addToCart, getCart } = require('../controllers/cartController');
const { isAuthorized } = require('../middlewares/IsAuthorized');
const router = express.Router()

router.get('/getcart',isAuthorized,getCart)
router.post('/addtocart',isAuthorized,addToCart)

module.exports = router