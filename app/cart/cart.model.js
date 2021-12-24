const mongoose = require('mongoose');
const paginate = require('../helpers/paginate');
const Schema = mongoose.Schema;

const schema = mongoose.Schema({
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    total : {type : Number, default : 0},
    user : {type: Schema.Types.ObjectId, ref: 'User'}
  
}, {
    timestamps: true,
    toJSON: { virtuals: true }
})


schema.plugin(paginate);
const Cart = mongoose.model('Cart', schema);
module.exports = Cart;