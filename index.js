const express    = require('express');
const bodyParser = require('body-parser');
const config     = require('./config.json');
const mongoose   = require('mongoose')
var uploadDir    = require('path').join(__dirname, '/uploads');
const cors       = require('cors');
const app        = new express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(uploadDir));
app.use(cors());
app.options("*", cors());

//TODO: Create .env file and put credetials and db urls there
mongoose.connect(config.connectionString,{ useNewUrlParser: true } )
    .then(console.log("connection with db successfull"))
    .catch((err) => console.log(err));

app.use(require('./product/router'));

app.listen(config.port, () => {
    console.log(`listening on ${config.port}`);
});


