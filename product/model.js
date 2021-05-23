const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const productModel = mongoose.Schema({
    name : {
        type :String,
        searchable: true,
    },
    price : Number,  
    category: String,
    description: String,
    stock: String,
    img:String,
     createdDate: { type: Date, default: Date.now },
     owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

})


productModel.plugin(mongoosePaginate);

const Product = mongoose.model('Product', productModel);
Product.paginate().then({});
module.exports = Product;
