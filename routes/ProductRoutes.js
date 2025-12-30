const express = require('express');
const router = express.Router()
const {allProducts,singleproduct,addProduct,updateProduct,deleteProduct} = require('../controllers/productController');
const { isAuthorized, isAdmin } = require('../middlewares/IsAuthorized');
const multer  = require('multer')
const path = require('path');
// todo check folder is present

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, './product_images')
    },
    filename:function (req,file,cb){
        cb(null , `${Date.now()}_${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`)
    }
})
const upload = multer({ storage: storage })

router.get("/",allProducts)
router.get('/singleproduct/id=:id',singleproduct)
//admin routes
router.post('/addproduct',upload.array('Product_Images',5),isAuthorized,isAdmin,addProduct)
router.put('/updateproduct/id=:id',upload.array('NewImages',5),isAuthorized,isAdmin,updateProduct)
// router.delete('/deleteproduct/id=:id',isAuthorized,isAdmin,deleteProduct)

module.exports = router