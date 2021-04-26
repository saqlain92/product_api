const express    = require('express');
require('./user/passport');
const bodyParser = require('body-parser');
const config     = require('./config.json');
const passport   = require('passport')
const mongoose   = require('mongoose')
var uploadDir    = require('path').join(__dirname, '/uploads');
const cors       = require('cors');
const app        = new express();
const secureRoutes = require('./product/router');
const routes     = require('./user/router');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(uploadDir));
app.use(cors());
app.options("*", cors());
app.use( require('./user/router'));
app.use('/user', passport.authenticate('jwt', { session: false }), secureRoutes);

//TODO: Create .env file and put credetials and db urls there
mongoose.connect(config.connectionString,{ useNewUrlParser: true } )
    .then(console.log("connection with db successfull"))
    .catch((err) => console.log(err));

    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({ error: err });
      });

app.listen(config.port, () => {
    console.log(`listening on ${config.port}`);
});


