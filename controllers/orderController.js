const Orders = require('../models/orderModel')
const Products = require('../models/productsModel')
const User = require('../models/usersModel')

async function getOrders(req, res) {
    const userid = req.user._id
    // console.log(userid)
    const orders = await Orders.find({ 'user': userid }).sort({ createdAt: -1 }).populate({
        path: 'productdetails.productid',
        model: Products
    })
    // if no order handle that
    // console.log(orders)
    return res.status(200).json({orders : orders })
}

async function PlaceOrder(req, res,next) {
    const { products, addressFormData, paymentMethod } = req.body
    //get user id
    const userid = req.user._id
    //map products
    // todo take id of product and fetch its price here 
    const orderProducts = products.map(item => {
        const sellingPrice = item.productdetails.price;
        const shippingCharges = item.productdetails.shippingCharges || 0;
        const otherCharges = item.productdetails.otherCharges || 0;
        const quantity = item.quantity;

        const TotalProductPrice =
            (sellingPrice + shippingCharges + otherCharges) * quantity;
            return {
            productid: item.productdetails._id,
            priceDetails: {
                sellingPrice,
                shippingCharges,
                otherCharges
            },
            quantity,
            TotalProductPrice
        };
    });
    //map total price
    const totalOrderPrice = orderProducts.reduce((sum, item) => sum + item.TotalProductPrice, 0)
    //map address 
    const address = {
        building: addressFormData.building,
        area: addressFormData.area,
        landmark: addressFormData.landmark,
        city: addressFormData.city,
        state: addressFormData.state,
        pincode: addressFormData.pincode,
        country: addressFormData.country,
        phone: addressFormData.phone,
    }
    const order = await Orders.create({
        user: userid,
        productdetails: orderProducts,
        totalOrderPrice,
        address,
        paymentMethod
    });
    // console.log(order)
    res.status(201).json({ order: order.status })
    next()
}
async function handlStock(req,res){
    const {products} = req.body
    const userid = req.user._id
    console.log('stock')
    for (const product of products) {
        await Products.findByIdAndUpdate( 
            product.productdetails._id,
            {
                $inc:{inStock:-product.quantity}
            }
         )
    }
    await User.findByIdAndUpdate(
        userid,
        {
            $set:{cartitems:[]}
        }
    )

}
module.exports = { getOrders, PlaceOrder,handlStock }