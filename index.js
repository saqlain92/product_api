const express      = require('express');
const morgan       = require('morgan');
const bodyParser   = require('body-parser');
const config       = require('./config.json');
const passport     = require('passport')
const mongoose     = require('mongoose')
var uploadDir      = require('path').join(__dirname, '/uploads');
const cors         = require('cors');
const app          = new express();
const secureRoutes = require('./Routes/secured');
const {handleError}= require('./helpers/error');

require('./user/passport');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use( express.static(uploadDir));
app.use('/static', express.static('uploads'));
app.use(cors());
app.use(morgan('tiny'));
app.options("*", cors());
app.use( require('./Routes/public'));
// to be accessible with token
app.use('/user', passport.authenticate('jwt', { session: false }), secureRoutes);


mongoose.connect(config.connectionString,{ useNewUrlParser: true } )
    .then(console.log("connection with db successfull"))
    .catch((err) => console.log(err));
//error handler
    app.use((err, req, res, next) => {
        handleError(err, res);
      });

app.listen(config.port, () => {
    console.log(`listening on ${config.port}`);
});


