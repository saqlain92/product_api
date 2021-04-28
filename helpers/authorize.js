const jwt = require('jsonwebtoken');

const authorize = (roles) =>{
    return (req, res, next)=>{
        const authHeader = req.headers.authorization;
            const token = authHeader.split(' ')[1];
            const user = jwt.verify(token, 'your_jwt_secret');
            console.log("in authorization middleware",user)
            if(roles.includes(user.role)){
                next();
            } else {
                return res.status(400).send("unathorized for this route");
            }
    };
};
module.exports = authorize;
