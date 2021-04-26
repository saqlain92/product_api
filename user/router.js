const express = require('express');
const Router  = express.Router();
const jwt = require('jsonwebtoken');
const passport = require("passport");
const User = require('./model');
const service = require('./service');


Router.post('/login', (req, res, next) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: info.message,
                user   : user
            });
        }
       req.login(user, {session: false}, (err) => {
           if (err) {
               res.send(err);
           }
           // generate a signed son web token with the contents of user object and return it in the response
           const token = jwt.sign(user.toJSON(), 'your_jwt_secret');
           return res.json({user, token});
        });
    })(req, res);
});

Router.post('/signUp' ,(req, res)=>{
  const user = new User(req.body);
  return res.status(200).send(user);
});

Router.post('/user',service.validate, (req,res)=>{
  service.createUser(req.body).
  then(user => res.status(200).send(user)).
  catch(err => res.status(400).send(err));
})

Router.get('/user', (req, res)=>{
  service.getAll().
  then(users => res.status(200).send(users)).
  catch(err => res.status(400).send(err));
})

module.exports = Router;