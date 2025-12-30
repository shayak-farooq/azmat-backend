const Product = require('../models/productsModel')

async function allProducts(req, res) {
    //will receive from frontende limit e.g 30
    const skip = 30
    const limit = 1
    // const products = await Product.find({}).limit(limit).skip(skip)
    const products = await Product.find({})
    return res.status(200).json({ products })
}
async function singleproduct(req, res) {
    const { id } = req.params
    const product = await Product.findById(id)
    return res.status(201).json({ product })
}

//add only admin permission
async function addProduct(req, res) {
    const { title, batchNo, desc, price, inStock, discount } = req.body
    if (!title || !batchNo || !desc || !price || !inStock || !discount) {
        return res.status(400).json({ err: "all fields are required" })
    }
    console.log(req.files)
    const filenames = req.files.map(item => item.filename)
    console.log(filenames)
    console.log(req.body)
    const addedProduct = await Product.create(
        {
            title: title,
            batchNo: batchNo,
            desc: desc,
            price: price,
            inStock: inStock,
            discount: discount,
            productImages: filenames
        }
    )
    return res.status(201).json({ id: addedProduct._id, message: "product added" })
}
async function updateProduct(req, res) {
    const { Product_Images,title, batchNo, desc, price, inStock, discount } = req.body
    const { id } = req.params
    // console.log(req.body)
    console.log('files', req.files)
    const filenames = [...Product_Images, ...req.files.map((item) => item.filename)]
    console.log('filenames', filenames)
    const updatedProduct = await Product.findByIdAndUpdate(id,
        {
            $set: {
                title: title,
                batchNo: batchNo,
                desc: desc,
                price: price,
                inStock: inStock,
                discount: discount,
                productImages: filenames
            }
        },
        { new: true, runValidators: true })
    if (!updatedProduct) {
        return res.status(404).json({ err: "product not found" })
    }
    res.status(200).json({ message: `product updated ${updatedProduct}` })
}

async function deleteProduct(req, res) {
    const { id } = req.params
    const deletedProduct = await Product.findByIdAndDelete(id)
    if (!deletedProduct) {
        return res.status(404).json({ err: "product not found" })
    }
    return res.status(200).json({ message: "Product deleted" })
}

module.exports = { allProducts, singleproduct, addProduct, updateProduct, deleteProduct }