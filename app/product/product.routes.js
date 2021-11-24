const express = require('express');
const authorize = require('../helpers/auth');
const validate = require('../helpers/validate');
const { route } = require('../resturaunt/resturaunt.routes');
const productController = require('./product.controller');
const productValidation = require('./product.validation');
const router = express.Router();

router
    .route('/')
    .post(authorize(['seller']), validate(productValidation.createProduct), productController.createProduct)


module.exports = router