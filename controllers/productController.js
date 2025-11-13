const Product = require('../models/productsModel')

async function allProducts(req, res) {
    const products = await Product.find({})
    return res.json({ products })
}
async function addProduct(req, res) {
    const { title, desc, price,catagory,image,netweight,stock } = req.body
    if (!title || !desc || !price || !catagory ||!image || !netweight || !stock ) {
        return res.json({err:"all fields are required"})
    }
    await Product.create({
        title: title,
        desc: desc,
        price: price,
        catagory:catagory,
        image:image,
        netweight:netweight,
        stock:stock
    })
    return res.json({ message: "product added" })
}
module.exports = { allProducts, addProduct }