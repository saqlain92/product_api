const Joi = require("joi");
const {objectId} = require('../helpers/customValidation');

const createProduct = {
    body: Joi.object().keys({
        productName: Joi.string().required(),
        description: Joi.string(),
        price: Joi.number().integer().required(),   
        mainProduct: Joi.string().custom(objectId)
    })
}

module.exports = {
    createProduct
}
