const Product = require('../models/productsModel')

async function allProducts(req, res) {
    const products = await Product.find({})
    return res.json({ products })
}
//add only admin permission
async function addProduct(req, res) {
    const { title, desc, price,catagory,image,netweight,stock } = req.body
    if (!title || !desc || !price || !catagory ||!image || !netweight || !stock ) {
        return res.json({err:"all fields are required"})
    }
    await Product.create({...req.body})
    return res.status(201).json({ message: "product added" })
}
async function updateProduct(req,res) {
    const {id} = req.params
    const updateData = req.body
    const updatedProduct = await Product.findByIdAndUpdate(id,updateData,{new: true, runValidators: true})
    if(!updatedProduct) {
        return res.status(404).json({err:"product not found"})
    }
    res.status(200).json({message:`product updated ${updatedProduct}`})
}

async function deleteProduct(req,res) {
    const {id} = req.params
    const deletedProduct = await Product.findByIdAndDelete(id)
    if(!deletedProduct){
        return res.status(404).json({err:"product not found"})
    }
    return res.json({message:"Product deleted"})
}

module.exports = { allProducts, addProduct,updateProduct,deleteProduct }