const mongoose = require('mongoose');
const Product = require('./productsModel')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['USER', 'ADMIN'], default: 'USER' },
    phone: { type: String, unique: true },
    address: [
        {
            label: String, // e.g. "Home", "Office"
            houseNo: String,
            area: { type: String, required: true },
            landmark: String,
            city: { type: String, required: true },
            state: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true },
        }
    ],
    cart:[
        {
            productid:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product'
            },
            quantity:{
                type:Number,
                default:1
            }
        }
    ],
    updatedAt: Date

}, { timestamps: true })

module.exports = mongoose.model('user', userSchema)