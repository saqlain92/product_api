const userService = require("./user.service");
const catchAsync = require("../helpers/catchAsync");
const httpStatus = require("http-status");
const passport = require("passport");
const jwt = require("jsonwebtoken");


const createUser = catchAsync(async (req, res, next) => {
    const user = await userService.createUser(req.body ,next);
    if(!!user) res.status(httpStatus.CREATED).send(user);
  });

const login = catchAsync(async (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.status(400).json({
          message: info.message,
          user: user
        });
      }
      req.login(user, { session: false }, (err) => {
        if (err) {
          res.send(err);
        }
        // generate a signed son web token with the contents of user object and return it in the response
        const token = jwt.sign(user.toJSON(), 'your_jwt_secret');
        return res.json({ user, token });
      });
    })(req, res);
  });

  const getUsers = catchAsync(async (req, res, next) => {
    const users = await userService.getUsers();
     res.status(httpStatus.CREATED).send(users);
  });

  const changePassword = catchAsync(async (req, res, next) => {
    const users = await userService.changePassword(req.user, req.body);
     res.status(httpStatus.CREATED).send(users);
  });

  const forgetPassword = catchAsync(async (req, res, next) => {
    const result = await userService.forgetPass(req.body);
     res.status(httpStatus.CREATED).send(result);
  });

  const deleteUser = catchAsync(async (req, res, next) => {
    const result = await userService.deleteUser(req.params.userid);
     res.status(httpStatus.CREATED).send(result);
  });

  module.exports = {
      createUser,
      login,
      getUsers,
      changePassword,
      forgetPassword,
      deleteUser
      
  }