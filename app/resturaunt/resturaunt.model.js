const mongoose = require('mongoose');
// const bcrypt   = require('bcrypt');
const paginate = require('../helpers/paginate');
const Schema = mongoose.Schema;

const schema = mongoose.Schema({
    name: { type: String },
    owner: { type: Schema.Types.ObjectId, ref: 'Aser' },
    description : {type : String},
    city : {type: String},
    address : String,
    // cityCode : String,   
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
const Resturaunt = mongoose.model('Resturaunt', schema);
module.exports = Resturaunt;