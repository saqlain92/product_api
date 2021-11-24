const express = require('express');
const authorize = require('../helpers/auth');
const validate = require('../helpers/validate');
const userValidation = require('./user.validation');
const userController = require("./user.controller")

const router = express.Router();

router
    .route('/signup')
    .post(validate(userValidation.createUser), userController.createUser);

router
    .route('/login')
    .post(validate(userValidation.login), userController.login);

router
    .route('/')
    .get(authorize("admin"), userController.getUsers);

router  
    .route('/password')
    .put(authorize("admin", "customer", "seller"), validate(userValidation.changePassword) , userController.changePassword)
    .get(validate(userValidation.forgetPassword), userController.forgetPassword)

router
    .route('/:userid')
    .delete(authorize('admin'), validate(userValidation.deleteUser), userController.deleteUser)

module.exports = router;