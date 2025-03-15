const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');


const productSchema = new mongoose.Schema({
    productName: String,
    brandName:String,
    category:String,
    productImage:String,
    description: String,
    price: Number,
    stock: Number,
}, {
    timestamps: true
})



// Create and export the User model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
