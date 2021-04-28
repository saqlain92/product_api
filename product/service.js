const Product    = require('./model');
const multer     = require('multer');
var uploadDir    = require('path').join(__dirname,'../uploads/');
const joi        = require('joi');
const nodemailer = require('nodemailer');
const  config    = require('../config.json');

async function add(req, next) {
    try {

        if (req.body.name) {
            if (req.file) {
                fileName = req.file.mimetype && req.file.mimetype.split("/")

                _product = new Product({
                    name: req.body.name,
                    descrip: req.body.descrip,
                    img: uploadDir + req.file.filename

                });
            }
            else {
                _product = new Product({
                    name: req.body.name,
                    descrip: req.body.descrip
                });

            }
            console.log(uploadDir);
            console.log(_product.img);
            return await _product.save();
        }

    }
    catch (err) {
        next(err);
    }
}

async function getAll() {

    return await Product.find().limit();
}

async function getOne(id) {
    const product = await Product.findById(id);
    if (product) return product;
    else return { error: "product doesnt exist" };
}

async function _delete(id) {
    if (await Product.findById(id)) {
        await Product.findByIdAndDelete(id);
        return "deleted successfully";
    }
    else {
        return "product doesnt exist";
    }
};

async function _update(id, productParams) {
    const product = await Product.findByIdAndUpdate(id, productParams, {new : true});
    return product;
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        // console.log(file.mimetype);
        let ext = file.mimetype && file.mimetype.split("/");
        cb(null, file.fieldname + '-' + Date.now() + "." + ext[1]);
    }
});


function validate(req, res, next) {
    const schema = joi.object({
        name: joi.string().required(),
        descrip: joi.string().required()
    });
    validateRequest(req, res, next, schema);
}

function validateRequest(req, res, next, schema) {
    const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    };

    const { error, value } = schema.validate(req.body, options);

    if (error) {
        res.status(400).send(`validation error : ${error.details.map(x => x.message).join(', ')}  `);
    }
    else {
        next();
    }
}

async function filter(params){
    return await Product.find({descrip : params});
}

var upload = multer({ storage: storage });

async function mailer(params) {

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: config.user,
        pass: config.pass
    }
});
console.log(params);
var mailOptions = {
    from: config.user,
    to: '181012@students.au.edu.pk',
    subject: params.subject,
    text: params.message
};

      await transporter.sendMail(mailOptions);
      return {message : "added sucessfully"};

}


module.exports = {
    add,
    getAll,
    getOne,
    _delete,
    _update,
    upload,
    validate,
    mailer,
    filter
};