const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');

const schema = mongoose.Schema({
    user: String,
    password: String
})

schema.pre('save', function (next) {
    try {
        if (this.isNew || this.isModified('password')) {
            const hash = bcrypt.hashSync(this.password, 10);
            this.password = hash;
            return next();
        }
    }
    catch (error) {
        return next(error);
    }
})


module.exports = mongoose.model('User', schema);