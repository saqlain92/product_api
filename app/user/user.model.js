    const mongoose = require('mongoose');
    const bcrypt   = require('bcrypt');

    const schema = mongoose.Schema({
        name : {type : String},
        phone : {type : String},
        email : {
            type : String,
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String
        },

        city : String
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

    schema.methods.isValidPassword = async function(password){
        const user = this;
        const compare  = await bcrypt.compare(password, user.password);
        return compare;
    }


    const Aser = mongoose.model('Aser', schema);
    module.exports = Aser;