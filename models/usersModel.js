const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
    phone: {type:String},
    address: [
        {
            label: String, // e.g. "Home", "Office"
            street: String,
            city: String,
            state: String,
            postalCode: String,
            country: String,
        }
    ],
    updatedAt: Date

}, { timestamps: true })

module.exports = mongoose.model('user', userSchema)