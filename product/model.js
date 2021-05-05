const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const productModel = mongoose.Schema({
    name : String,
    description: String,
    img:String,
     createdDate: { type: Date, default: Date.now }
})

productModel.plugin(mongoosePaginate)

const Product = mongoose.model('Product', productModel);
Product.paginate().then({});
module.exports = Product;
