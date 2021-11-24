const mongoose = require('mongoose');
const paginate = require('../helpers/paginate');
const Schema = mongoose.Schema;

const schema = mongoose.Schema({
    productName: { type: String },
    seller: { type: Schema.Types.ObjectId, ref: 'Aser' },
    resturaunt: {type: Schema.Types.ObjectId, ref: 'Resturaunt' },
    description : {type : String},
    price : {type : String},
    salePrice : {type : String},
    onSale : {type : Boolean, default: false},
    featured : {type: Boolean, default: false},
    isVariable: {type: Boolean, default: false},
    mainProduct:{type: Schema.Types.ObjectId, ref: 'Product'},
    productType: {type: String, enum: ['main', 'variant'], default: 'main' },
    quantity: {type: Number},
    gallery: [{type: String}],
}, {
    timestamps: true,
    toJSON: { virtuals: true }
})

// schema.pre('save', function (next) {
//     try {
//         if (this.isNew) {
//             const balance = this.amount || 0;
//             this.amount = balance;
//             return next();
//         }
//         else next();
//     }
//     catch (error) {
//         next(error);
//     }
// })

schema.plugin(paginate);
const Product = mongoose.model('Aroduct', schema);
module.exports = Product;