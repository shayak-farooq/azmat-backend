const Products = require('../models/productsModel')
const User = require('../models/usersModel')

async function addToCart(req, res) {
    try {
        const { productid,quantity } = req.body
        console.log(productid)
        //if product is added already then increment the quantity

        const userid = req.user._id
        console.log(userid)

        const user = await User.findByIdAndUpdate(userid,
            { $push: { cart: { productid: productid, quantity:quantity } } },
            { new: true }
        )

        console.log(user)
        return res.status(201).json({ message: 'successfull' })
    } catch (error) {

    }

}
async function getCart(req, res) {
    try {
        const userid = req.user._id
        console.log(userid)
        const user = await User.findById(userid)
        const cartProducts = user.cart
        console.log(cartProducts)
        res.status(200).json({ products: cartProducts })
    } catch (error) {

    }
}
module.exports = { addToCart, getCart }