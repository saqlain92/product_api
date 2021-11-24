const jwt = require('jsonwebtoken');
const { ErrorHandler } = require('./error');

const authorize = (roles) => {
    return (req, res, next) => {
        if (req.headers && req.headers.authorization) {
            const authHeader = req.headers.authorization;
            const token = authHeader.split(' ')[1];
            const user = jwt.verify(token, 'your_jwt_secret');
            if (!user) {
                const err = new ErrorHandler("200", "false", "invalid token");
                next(err);
            }
            req.user = user;
        }
        else {
            next(new ErrorHandler("200", "false", "token required"));
        }
        console.log("in authorization middleware", req.user)
        if (roles.includes(req.user.role)) {
            next();
        } else {
            const error = new ErrorHandler("200", "false", 'this user is unauthorized for this route');
            next(error);
        }
    };
};

// const authorize = (roles) =>{
//     return (req, res, next)=>{
//         const authHeader = req.headers.authorization;
//             const token = authHeader.split(' ')[1];
//             const user = jwt.verify(token, 'your_jwt_secret');
//             console.log("in authorization middleware",user)
//             if(roles.includes(user.role)){
//                 next();
//             } else {
//                 const error = new ErrorHandler('this user is unauthorized for this route') ;
//                 next(error);
//             }
//     };
// };
module.exports = authorize;



// const jwt = require('jsonwebtoken');
// const User = require('../user/model');
// const { ErrorHandler } = require('./error');
// const { findById } = require('../user/model');

// const checkToken = async function (req, res, next) {
//     if (req.headers && req.headers.authorization) {
//         const authHeader = req.headers.authorization;
//         const token = authHeader.split(' ')[1];
//         const user = jwt.verify(token, 'your_jwt_secret');
//         if (!user) {
//             const err = new ErrorHandler("200", "false", "invalid token");
//             next(err);
//         }
//         req.user = user;
//         return next();
//     }
//     else {
//         next(new ErrorHandler("200", "false", "token required"));
//     }
// }
// module.exports = { checkToken };