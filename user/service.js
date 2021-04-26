const User   = require('./model');

const jwt    = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const joi    = require('joi');
const config = require('../config.json');
const { mailer } = require('../product/service');

async function createUser(body){
    
        const user = await User.findOne({user : body.email});
        console.log(user);
         if(user){
             return "user already exist";
        }
        else{
        const _user = new User(body);
         await _user.save();
         params = {
             subject : "New User",
             message : `A new user ${body.email} have been added successfully`
         };
         return await mailer(params);
        }

}

function validate(req , res, next) {
    const schema =  joi.object({
        email : joi.string().required(),
        password : joi.string().min(6).max(12).required()
    });
    validateRequest(req , res, next, schema);
}

function validateRequest(req, res, next, schema) {
    const options = {
        abortEarly : false,
        allowUnknown : true,
        stripUnknown : true
    };

    const { error } = schema.validate(req.body , options);

    if(error){
        res.status(400).send(`validation error : ${error.details.map(x=> x.message).join(', ')}  `);
    }
    else{
        next();
    }
}

async function getAll(body) {
    return await User.find();    
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
//     authenticate,
    validate,
     getAll
 }