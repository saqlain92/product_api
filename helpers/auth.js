const jwt = require('jsonwebtoken');
const User = require('../user/model');
const { ErrorHandler } = require('./error');
const { findById } = require('../user/model');

const checkToken = async function (req, res, next)  {
    if(req.headers && req.headers.authorization){
        const authHeader = req.headers.authorization;
            const token = authHeader.split(' ')[1];
            const user = jwt.verify(token, 'your_jwt_secret');
            if (!user){
                const err = new ErrorHandler("invalid token");
                next(err);
            }
            req.user = user;
            next();
    }
    else{
    next(new ErrorHandler("token required"));
    }
}
module.exports = { checkToken };