const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    productdetails: [{
        productid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        priceDetails: {
            sellingPrice: {
                type: Number,
                required: true
            },
            shippingCharges: {
                type: Number,
                // required: true
            },
            otherCharges: {
                type: Number,
            }
        },
        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity must be at least 1']
        },
        TotalProductPrice: {
            type: Number,
        }
    }],
    totalOrderPrice: {
        type: Number,
    },
    // phone no

    // Order Date and time and delivery data
    deliveryDate: {
        expectedDeliveryDate: {
            type: Date,
            default: () => new Date(Date.now() + 10 * 24 * 60 * 60 * 1000) //10 days after now date
        },
        actualDeliveryDate: {
            type: Date
        }

    },
    // address on which item is delivered or to be delivered
    status: {
        type: String,
        enum: ['delivered', 'shipped', 'orderConfirmed'],
        default: 'orderConfirmed'
    },
    address: {
        label: String, // e.g. "Home", "Office"
        country: { type: String, required: true },
        state: { type: String, required: true },
        city: { type: String, required: true },
        area: { type: String, required: true },
        building: String,
        landmark: String,
        pincode: { type: String, required: true },
        phone: {
            type: Number,
            required: true
        },
        alternatePhone: {
            type: Number
        },
    },
    // payment method
    paymentMethod: {
        type: String,
        required: true,
        enum: ['COD', 'UPI', 'Debit Card', 'Credit Card']
    }

}, { timestamps: true })

module.exports = mongoose.model('orders', OrderSchema)