const mongoose = require('mongoose');
const Product = require('./productsModel')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true ,min:8 },
    role: { type: String, enum: ['USER', 'ADMIN'], default: 'USER' },
    address: [
        {
            building: String,
            area: { type: String, required: true },
            landmark: String,
            city: { type: String, required: true },
            state: { type: String, required: true },
            pincode: { type: String, required: true },
            country: { type: String, required: true },
            phone: { type: String,required:true,max:10},
            alternatephone: { type: String,max:10},
        }
    ],
    cartitems:[
        {
            productdetails:{
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