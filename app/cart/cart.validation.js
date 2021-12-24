const Joi = require("joi");
const {objectId} = require('../helpers/customValidation');

const createCart = {
    body: Joi.object().keys({
        product: Joi.string().custom(objectId)
    })
}

module.exports = {
    createCart
}
