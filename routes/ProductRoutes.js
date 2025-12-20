const express = require('express');
const router = express.Router()
const {allProducts,singleproduct,addProduct,updateProduct,deleteProduct} = require('../controllers/productController');
const { isAuthorized, isAdmin } = require('../middlewares/IsAuthorized');

router.get("/",allProducts)
router.get('/singleproduct/id=:id',singleproduct)
router.post('/addproduct',isAuthorized,isAdmin,addProduct)
router.put('/updateproduct/id=:id',isAuthorized,isAdmin,updateProduct)
router.delete('/deleteproduct/id=:id',isAuthorized,isAdmin,deleteProduct)

module.exports = router