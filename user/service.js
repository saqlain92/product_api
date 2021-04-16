const User = require('./model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secret = "its a new day";
const joi = require('joi');

async function createUser(body){
    
        const user = await User.findOne({user : body.user});
        console.log(user);
         if(user){
             throw "user already exist";
        }
        else{
        const _user = new User(body);
        return await _user.save();
        }


}

async function authenticate(body){
    if(body.user && body.password){
        const user = await User.findOne({user : body.user});
        if(user && await bcrypt.compareSync(body.password , user.password)){
            const token = jwt.sign(user.toJSON(), secret);
            return {
                token
            };
        }
    }
}

function validate(req , res, next) {
    const schema =  joi.object({
        user : joi.string().required(),
        password : joi.string().min(6).required()
    });
    validateRequest(req , res, next, schema);
}

function validateRequest(req, res, next, schema) {
    const options = {
        abortEarly : false,
        allowUnknown : true,
        stripUnknown : true
    };

    const { error , value } = schema.validate(req.body , options);

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



module.exports = {
    createUser,
    authenticate,
    validate,
    getAll
}