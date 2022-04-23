const express = require('express');
const authorize = require('../helpers/auth');
const validate = require('../helpers/validate');
const restController = require('./resturaunt.controller');
const restValidation = require('./resturaunt.validation');
const router = express.Router();
const upload = require('../helpers/files');

router 
    .route('/')
    .post(authorize('seller'),upload.uploadImages, validate(restValidation.createRest),  restController.createRest)
    .get(validate(restValidation.getRests), restController.getResturaunts)

router
    .route('/:resturauntId')
    .put(authorize('seller'), validate(restValidation.updateRest), restController.updateRest)
    .get(validate(restValidation.getbyid), restController.getbyid)
    .delete(authorize(['admin','seller']),validate(restValidation.getbyid), restController.deleteRest)


module.exports = router;