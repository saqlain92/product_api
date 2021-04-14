const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
var uploadDir = require('path').join(__dirname,'/uploads');
module.exports = require('path').join(__dirname,'/uploads/');
const cors = require('cors');
const app = new express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(uploadDir));
app.use(cors());
app.options("*",cors());


mongoose.connect('mongodb+srv://saqlain:92002400@mycluster.3jf9d.mongodb.net/test', { useNewUrlParser: true })
    .then(console.log("connection with db successfull"))
    .catch((err) => console.log(err));

    app.use(require('./product/router'));

    app.listen("3000", ()=>{
        console.log("listening on 3000");
    });


