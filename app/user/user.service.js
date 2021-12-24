const User = require('./user.model');
const { ErrorHandler} = require('../helpers/error');
const mailer = require('../helpers/mailer');
// const { mailer } = require('../product/service');
// const Product = require('../product/model');

async function createUser(body, next) {
    const user = await User.findOne({ email: body.email });
    console.log(user);
    if (user) {
        const err = new ErrorHandler("200","false",'user already exist');
        return(err);
    }
        const _user = new User(body);
        console.log(_user);
        await _user.save();
        params = {
            subject: "New User",
            message: `A new user ${body.email} have been added successfully`
        };
        // return await mailer(params);
        return _user;
}

const getUsers = async() => {
    const users = await User.find();
    return {status : "200", success: "true", result: {users}};
}

const changePassword = async(user, body) => {
                if (user.password === body.oldPassword) {
                    const _user = await User.findByIdAndUpdate(user._id, { password: body.newPassword }, { new: true })
                    return {status:"200", success:"true", result:{_user}};
                }
                return {status:"400", success:"false", message:"incorrect password"};
}

const forgetPass = async(body) => {
    if (body.email) {
        const user = await User.findOne({ email: body.email });
        if (user) {
            console.log(user.password);
            const params = {
                email: user.email,
                subject: "Forgot Password",
                message: `Dear ${user.email} your password is ${user.password}`
            }
            console.log(user.email);
            mail = await mailer(params);
            console.log(mail);
            if(mail)
            return {status: "200", success: "true", result: {}, message: "your password is sent to your email"};
        }
        else {
            return {status: "400", success: "false", result: {}, message: "no user found against this email"};
        }
    }
}

const deleteUser = async(userid)=> {
    if(userid){
                const user = await User.findByIdAndDelete(userid);
                return {status: "200", success: "true", result: {}, message: "deleted"};
            }
}


module.exports = {
    createUser,
    getUsers,
    changePassword,
    forgetPass,
    deleteUser
    
    
}