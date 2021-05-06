const User = require('./model');
const { ErrorHandler } = require('../helpers/error');
const joi = require('joi');
const jwt = require('jsonwebtoken');
const { mailer } = require('../product/service');
const { findByIdAndUpdate } = require('./model');

async function createUser(body, next) {

    const user = await User.findOne({ email: body.email });
    console.log(user);
    if (user) {
        const err = new ErrorHandler('user already exist');
        next(err);
    }
    else {
        const _user = new User(body);
        await _user.save();
        params = {
            subject: "New User",
            message: `A new user ${body.email} have been added successfully`
        };
        return await mailer(params);
    }

}

function validate(req, res, next) {
    const schema = joi.object({
        email: joi.string().required(),
        password: joi.string().min(6).max(12).required(),
        role: joi.string().valid('Admin', 'Customer').required()
    });
    validateRequest(req, res, next, schema);
}

function validateRequest(req, res, next, schema) {
    const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    };

    const { error } = schema.validate(req.body, options);

    if (error) {
        res.status(400).send(`validation error : ${error.details.map(x => x.message).join(', ')}  `);
    }
    else {
        next();
    }
}

async function getAll() {
    return await User.find();
}

async function changePass(req, next) {

            const user = req.user;
            if (user.password === req.body.old_password) {
                return await User.findByIdAndUpdate(user._id, { password: req.body.new_password }, { new: true })
            }
            else throw new ErrorHandler("wrong password");
}


async function forgetPass(body, next) {
    try {
        if (body.email) {
            const user = await User.findOne({ email: body.email });
            if (user) {
                console.log(user.password);
                const params = {
                    email: user.email,
                    subject: "Forgot Password",
                    message: `Dear ${user.email} your password is ${user.password}`
                }
                console.log(user.email);
                await mailer(params);
            }
            else throw new ErrorHandler('no user found');
        }
        else {
            throw new ErrorHandler('Email is required');
        }
    }
    catch (err) {
        next(err);
    }
}

// async function authenticate(body){
//     if(body.user && body.password){
//         const user = await User.findOne({user : body.user});
//         if(user && await bcrypt.compareSync(body.password , user.password)){
//             const token = jwt.sign(user.toJSON(), config.secret);
//             return {
//                 token
//             };
//         }
//     }
// }

module.exports = {
    createUser,
    //   authenticate,
    validate,
    getAll,
    forgetPass,
    changePass
}