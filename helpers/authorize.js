const jwt = require('jsonwebtoken');
const {ErrorHandler} = require('./error');

const authorize = (roles) =>{
    return (req, res, next)=>{
        const authHeader = req.headers.authorization;
            const token = authHeader.split(' ')[1];
            const user = jwt.verify(token, 'your_jwt_secret');
            console.log("in authorization middleware",user)
            if(roles.includes(user.role)){
                next();
            } else {
                const error = new ErrorHandler('this user is unauthorized for this route') ;
                next(error);
            }
    };
};
module.exports = authorize;
