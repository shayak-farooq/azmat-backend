const Orders = require('../models/orderModel')

async function getOrders(req, res) {
    const userid = req.user._id
    console.log(userid)
    const orders = await Orders.find({ 'user': userid })
    console.log(orders)
    return res.json({ order: orders })
}

async function PlaceOrder(req, res) {
    const { productid, sellingPrice,quantity, shippingCharges, phoneNo, paymentMethod } = req.body
    console.log(req.body)
    const userid = req.user._id
    const order = await Orders.create({
        user: userid,
        produuctdetails: {
            productid: productid,
            priceDetails: {
                sellingPrice: sellingPrice,
                shippingCharges: shippingCharges
            },
            quantity:quantity
        },
        phoneNo: phoneNo,
        paymentMethod: paymentMethod

    })
    console.log(order)
    return res.json({ order: 'order details' })
}
module.exports = { getOrders, PlaceOrder }