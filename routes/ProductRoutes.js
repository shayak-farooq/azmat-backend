const express = require('express');
const router = express.Router()
const {allProducts,addProduct,updateProduct,deleteProduct} = require('../controllers/productController')

router.post('/',addProduct)
router.post('/update/:id',updateProduct)
router.get('/delete/:id',deleteProduct)
router.get("/",allProducts)

module.exports = router