// const passport      = require('passport');
// const localStrategy = require('passport-local').Strategy;
// const passportJWT   = require("passport-jwt");
// const JWTStrategy   = passportJWT.Strategy;
// const ExtractJWT    = passportJWT.ExtractJwt;

// const User          = require('../app/user/user.model');

// passport.use(new localStrategy({
//   usernameField: 'email',
//   passwordField: 'password'
//   //passReqToCallback: true
// }, 
// function (email, password, cb) {
//   //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
//   return User.findOne({email, password}).exec()
//      .then(user => {
//        console.log(user);
//          if (!user) {
//              return cb(null, false, {message: 'Incorrect email or password.'});
//          }
//          return cb(null, user, {message: 'Logged In Successfully'});
//     })
//     .catch(err => {
//       console.log(err);
//       cb(err)});
// }
// ));

// passport.use(new JWTStrategy({
//   jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
//   secretOrKey   : 'your_jwt_secret'
// },
// async function (jwtPayload, cb) {

//   //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
//   await  User.findById(jwtPayload._id).exec()
//       .then(user => {
//         console.log(`here I am ${user}`);
//           return cb(null, user);
//       })
//       .catch(err => {
//           return cb(err);
//       });
// }
// ));



