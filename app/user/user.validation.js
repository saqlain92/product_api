const Joi = require("joi");
const {objectId} = require('../helpers/customValidation');


const createUser = {
    body : Joi.object().keys({
        name : Joi.string().required(),
        email : Joi.string().required(),
        password : Joi.string().required().min(6),
        role : Joi.string().valid("customer", "admin", "seller")
    })
};

const login = {
    body : Joi.object().keys({
        email :Joi.string().required(),
        password : Joi.string().required()
    })
}

const changePassword = {
    body : Joi.object().keys({
        oldPassword: Joi.string().required(),
        newPassword : Joi.string().required()
    })
}

const forgetPassword = {
    body : Joi.object().keys({
        email: Joi.string().required(),
    })
}

const deleteUser = {
    params : Joi.object().keys({
        userid: Joi.string().required().custom(objectId)
    })
}


module.exports = {
    createUser,
    login,
    changePassword,
    forgetPassword,
    deleteUser
}