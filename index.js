const express       = require('express');
const morgan        = require('morgan');
const bodyParser    = require('body-parser');
const fs            = require('fs');
const config        = require('./config.json');
const mongoose      = require('mongoose')
var path            = require('path');
var uploadDir       = require('path').join(__dirname, '/uploads');
const cors          = require('cors');
const jwt           = require('jsonwebtoken');
// const secureRoutes  = require('./Routes/secured');
const routes        = require('./app/routes');
const {handleError} = require('./helpers/error');
const { checkToken }= require('./helpers/auth');
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

const app           = new express();

require('./user/passport');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use( express.static(uploadDir));
app.use('/static', express.static('uploads'));
app.use(cors());

morgan.token('user', function (req, res) {
    if (req.headers.authorization) {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
        const user = jwt.verify(token, 'your_jwt_secret');
        return user.email;
    }
    else return "random user";
})
app.use(morgan('User: :user  IP: :remote-addr :remote-user  Method::method    URL::url   Status::status   Response length::res[content-length]   Response time::response-time ms  at: :date ', {stream : accessLogStream}));
app.options("*", cors());
app.use('/swiftbay', routes);
// app.use( require('./Routes/public'));
// to be accessible with token
// app.use('/user', checkToken , secureRoutes);
// app.use('/user', passport.authenticate('jwt', { session: false }), secureRoutes);


mongoose.connect(config.connectionString1,{ useNewUrlParser: true, useUnifiedTopology: true } )
    .then(console.log("connection with db successfull"))
    .catch((err) => console.log(err));
//error handler
    app.use((err, req, res, next) => {
        handleError(err, res);
      });

app.listen(config.port, () => {
    console.log(`listening on ${config.port}`);
});