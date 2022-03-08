// const mongoose = require('mongoose');
// const bcrypt   = require('bcrypt');

// const schema = mongoose.Schema({
//     email : {
//         type : String,
//         unique : true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     role: {
//         type: String
//     },
//     products: [{ 
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Product"
//      }] ,
//      city : String
// })

// // schema.pre('save', function (next) {
// //     try {
// //         if (this.isNew) {
// //             const balance = this.amount || 0;
// //             this.amount = balance;
// //             return next();
// //         }
// //         else next();
// //     }
// //     catch (error) {
// //         next(error);
// //     }
// // })

// schema.methods.isValidPassword = async function(password){
//     const user = this;
//     const compare  = await bcrypt.compare(password, user.password);
//     return compare;
// }


// module.exports = mongoose.model('User', schema);