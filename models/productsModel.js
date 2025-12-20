const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title:
    {
        type: String,
        trim: true,
        required: [true, 'Product title is required'],
        maxlength: [150, 'Title too long']
    },
    batchNo:{
        type:String,
    },
    desc: {
        type: String,
        trim: true,
        maxlength: [2000, 'Description too long']
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    Rating: {
        type: Number,
        default: 5,
        min: 0,
        max: 5,
    },
    inStock: Number,
    netWeight: String,
    image: [String],
}, { timestamps: true })

module.exports = mongoose.model('product', productSchema)