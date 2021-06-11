const { string } = require('joi');
const mongoose = require('mongoose');
const Product = require('../product/model');

const complaintSchema = mongoose.Schema({
    message : String,
    product : { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    status : String,
    complainterName : String,

},{
    timestamps : true
})

module.exports = mongoose.model('Complaint' , complaintSchema);