const express = require('express');
const router = express.Router()
const {allProducts,addProduct} = require('../controllers/productController')

router.post('/',addProduct)
router.get("/",allProducts)

module.exports = router