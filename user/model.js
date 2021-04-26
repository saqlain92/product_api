const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');

const schema = mongoose.Schema({
    email : {
        type : String,
        unique : true
    },
    password: {
        type: String,
        required: true
    }
})

// schema.pre('save', function (next) {
//     try {
//         if (this.isNew || this.isModified('password')) {
//             const hash = bcrypt.hashSync(this.password, 10);
//             this.password = hash;
//             return next();
//         }
//     }
//     catch (error) {
//         return next(error);
//     }
// })

schema.methods.isValidPassword = async function(password){
    const user = this;
    const compare  = await bcrypt.compare(password, user.password);
    return compare;
}


module.exports = mongoose.model('User', schema);