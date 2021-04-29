const mongoose = require('mongoose');

const productModel = mongoose.Schema({
    name : String,
    description: String,
    img:String,
     createdDate: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Product', productModel);
