const { model } = require('mongoose')
const Products = require('../models/productsModel')
const User = require('../models/usersModel')

async function getCart(req, res) {
    try {
        const userid = req.user._id
        // console.log(userid)
        const user = await User.findById(userid).populate({
            path: 'cartitems.productdetails',
            model: Products
        });
        // console.log(user)
        return res.status(200).json({name:user.name,phone:user.phone, products: user.cartitems, addresses:user.address })
    } catch (error) {

    }
}

async function addToCart(req, res) {
    try {
        const { productid, quantity } = req.body
        console.log(productid)
        const userid = req.user._id
        console.log(userid)
        
        const user = await User.findById(userid)

        const productindex = user.cartitems.findIndex(
            item => item.productdetails.toString() === productid
        )
        if (productindex > -1) {
            //409 Conflict
            return res.status(200).json({ message: 'Item already exists in cart' })
        }
        user.cartitems.push({
            productdetails: productid,
            quantity: quantity
        })
        // const user = await User.findByIdAndUpdate(userid,
        //     { $push: { cartitems: { productdetails: productid, quantity: quantity } } },
        //     { new: true }
        // )
        await user.save()
        return res.status(201).json({ message: 'successfull' })
    } catch (error) {

    }

}
async function removeitem(req, res) {
    const productid = req.params.id
    console.log(productid)
    const userid = req.user._id
    console.log(userid)

    await User.findByIdAndUpdate(
        userid,
        { $pull: { cartitems: { productdetails: productid } } },
        { new: true }
    )
    return res.status(200).json({ message: "Item Removed" })
}
async function updateQuantity(req, res) {
    try {
        const productid = req.params.id
        const userid = req.user._id
        const {quantity} = req.body

        console.log(
            'productid', productid,
            'userid', userid,
            'quantity', quantity
        )
        const user = await User.updateOne(
            {
                _id:userid,
                'cartitems.productdetails':productid
            },
            {
                $set:{"cartitems.$.quantity": quantity }
            }
        )
        console.log(user)
        return res.status(200).json({  message: 'quantity updated' })
    } catch (error) {

    }
}
module.exports = { addToCart, getCart, removeitem, updateQuantity }