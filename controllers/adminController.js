const Orders = require('../models/orderModel')
const User = require('../models/usersModel')
function adminlogin(req, res) {

    return res.status(200).json({ message: "successfull" })

}
async function getOrders(req, res) {
    const orders = await Orders.find({}).sort({ createdAt: -1 }).populate({
        path: 'user',
        model: User,
        select: '-password'
    })
    return res.status(200).json({ orders: orders })
}
async function singleOrder(req, res) {
    const { id } = req.params
    const order = await Orders.findById(id).populate({
        path: 'user',
        model: User,
        select: '-password'
    })
    return res.status(200).json({ order: order })
}
async function updateOrder(req, res) {
    const { id } = req.params
    const { status } = req.body
    console.log(req.body, id)
    let updatedOrder;
    if (status) {
        if (!['Delivered', 'Shipped'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }
        if (status == "Delivered") {
            updatedOrder = await Orders.findByIdAndUpdate(id, {
                $set: {
                    status: status,
                    'deliveryDate.actualDeliveryDate' : Date.now()
                }
            }).populate({
                path: 'user',
                model: User,
                select: '-password'
            })
        }
            if (status == "Shipped") {
                updatedOrder = await Orders.findByIdAndUpdate(id, {
                    $set: {
                        status: status
                    }
                }).populate({
                    path: 'user',
                    model: User,
                    select: '-password'
                })
            }
        }
        return res.status(200).json({ order: updatedOrder })
}

module.exports = { adminlogin, getOrders, singleOrder, updateOrder }