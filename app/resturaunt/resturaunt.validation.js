const Joi = require("joi");
const {objectId} = require('../helpers/customValidation');

const createRest = {
    body : Joi.object().keys({
        name : Joi.string().required(),
        description : Joi.string(),
        city : Joi.string(),
        address : Joi.string()
    })
}

const updateRest = {
    body : Joi.object().keys({
        name : Joi.string(),
        description : Joi.string(),
        city : Joi.string(),
        address : Joi.string()
    }),
    params : Joi.object().keys({
        resturauntId : Joi.string().custom(objectId)
    })
}

const getbyid = {
    params : Joi.object().keys({
        resturauntId: Joi.string().custom(objectId)
    })
}


const getRests = {
    query : Joi.object().keys({
        name: Joi.string(),
        owner: Joi.string().custom(objectId),
        city: Joi.string(),
        searchKey: Joi.string(),
        searchValue:Joi.string(),
        sortBy:Joi.string(),
        limit:Joi.number(),
        page:Joi.number()
    })
}

module.exports = {
    createRest,
    updateRest,
    getbyid,
    getRests
}