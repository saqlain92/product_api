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


// async function phone_Login(body){
//     if (body.phone){
//         const user = await User.findOne({phone: body.phone});
//         if (user){
//             const token = jwt.sign(user.toJSON(), 'your_jwt_secret');
//             return {
//                 user,
//                 success : true,
//                 token
//             }
//         } 
//         throw new ErrorHandler("200", "false", "user doesnt exist");
//     }
//     throw new ErrorHandler("200", "false", "Phone number is required"); 
// }

// // async function authenticate(body){
// //     if(body.user && body.password){
// //         const user = await User.findOne({user : body.user});
// //         if(user && await bcrypt.compareSync(body.password , user.password)){
// //             const token = jwt.sign(user.toJSON(), config.secret);
// //             return {
// //                 token
// //             };
// //         }
// //     }
// // }

// async function delete_Seller(req) {
//     if(req.params.id){
//         const seller = await User.findByIdAndDelete(req.params.id);
//         if(seller.role == "Seller") await Product.deleteMany({ owner:seller._id });
//         return "message : deleted successfull";
//     }
//     else throw new ErrorHandler("200","false","id is not supplied");
// }

module.exports = {
    createUser,
    getUsers,
    changePassword,
    forgetPass,
    deleteUser
    
    // login
//  authenticate,
    // validate,
    // getAll,
    // forgetPass,
    // changePass,
    // delete_Seller,
    // phone_Login
}