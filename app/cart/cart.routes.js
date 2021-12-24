const express = require('express');
const authorize = require('../helpers/auth');
const validate = require('../helpers/validate');
const { route } = require('../resturaunt/resturaunt.routes');
const cartController = require('./cart.controller');
const cartValidation = require('./cart.validation');
const router = express.Router();

router
    .route('/')
    .post(authorize(['customer']), validate(cartValidation.createCart), cartController.createCart)
    .patch(authorize(['customer']), validate(cartValidation.createCart), cartController.removeItem)

module.exports = router