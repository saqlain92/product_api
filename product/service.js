const Product    = require('./model');
const multer     = require('multer');
const joi        = require('joi');
const nodemailer = require('nodemailer');
const User       = require('../user/model');
const  config    = require('../config.json');
const authorize  = require('../helpers/authorize');
const { ErrorHandler } = require('../helpers/error');

async function add(req, next) {
    try {

        if (req.body.name) {
            if (req.file) {
                fileName = req.file.mimetype && req.file.mimetype.split("/")

                _product = new Product({
                    name: req.body.name,
                    description: req.body.description,
                    img: "/static/" + req.file.filename,
                    owner: req.user._id,
                    price: req.body.price,
                    category : req.body.category,
                    stock : req.body.stock
                    // img: uploadDir + req.file.filename

                });
            }
            else {
                _product = new Product({
                    name: req.body.name,
                    description: req.body.description,
                    owner: req.user._id,
                    price: req.body.price,
                    category : req.body.category,
                    stock : req.body.stock
                });

            }

            console.log(_product.img);
            const product = await _product.save();
            const _user = await User.findById(req.user._id);
            _user.products.push(product._id);
            _user.save();
            return _user;
        }

    }
    catch (err) {
        next(err);
    }
}
//     Product Search
async function _search(req) {
    const options = {
        page: req.query.page || 1,
        limit: req.query.limit || 10,
        collation: {
            locale: 'en',
        }}
    const string = req.query.string;
    const field = req.query.field;
    const result = await Product.paginate({ [field]: { $regex: string, $options: "i" }}, options);
    //const result = await Product.find({ [field]: { $regex: string, $options: "i" } });
    if (result) return { success: "true", status: "200", message: `${result.length} documents found`, docs: result };
};


//      Get All Products
async function getAll(req) {
    const options = {
        page: req.query.page || 1,
        limit: req.query.limit || 10,
        collation: {
            locale: 'en',
        },
        sort:req.query.field
    };

    const { docs } = await Product.paginate({owner : req.user.Id}, options);
    return docs;

    // console.log(typeof docs);

    // //  Sorting Products
    // if (req.body && req.body.sort == "asc") {
    //     const key = req.body.key;
    //     docs.sort((a, b) => a[key] > b[key] && 1 || -1);
    //     return docs;
    // }
    // if (req.body && req.body.sort == "desc") {
    //     const key = req.body.key;

    //     docs.sort((a, b) => a[key] < b[key] && 1 || -1);
    //     return docs;
    // }

    // else return docs;
}



async function getOne(id) {
    const product = await Product.findById(id);
    if (product) return product;
    else throw new ErrorHandler("200", "false", "product doesnt exist") ;
}


async function _delete(id) {
    if (await Product.findById(id)) {
        await Product.findByIdAndDelete(id);
        return "deleted successfully";
    }
    else {
         throw new ErrorHandler("200", "false", "product doesnt exist") ;
    }
};

async function sellerProducts(req){
 
    return await Product.find({owner : req.user._id}).populate('products');
    
}

async function _update(id, productParams) {
    const product = await Product.findByIdAndUpdate(id, productParams, { new: true });
    return product;
}

async function track(id) {
    return `the id number is ${id}`;
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
        description: joi.string().required(),
        stock: joi.number().required(),
        category: joi.string().required(),
        price: joi.number().required(),
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

async function filter(params) {
    return await Product.find({ description: params });
}

var upload = multer({ storage: storage });

async function mailer(params) {

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: config.email,
            pass: config.pass
        }
    });
    console.log(params);
    var mailOptions = {
        from: config.email,
        to: params.email || '181012@students.au.edu.pk',
        subject: params.subject,
        text: params.message
    };

    await transporter.sendMail(mailOptions);
    return { message: "added sucessfully" };

}

async function populate (params) {
    const products = await Product.find().populate('owner');
    return products;
}

async function buy(req){
  const product = await Product.findById(req.params.id);
  const buyer    = await User.findById(req.user._id);
  const seller    = await User.findById(product.owner);
  if(product && buyer && seller){
    if(buyer.amount < product.price) throw new ErrorHandler("200","false","unsufficient balance")
    else{
        if(product.stock<=0) throw new ErrorHandler("200", "false", "out of stock")
        else{
        product.stock = product.stock-1;
        buyer.amount -= product.price;
        seller.amount += product.price;
        await buyer.save();
        await seller.save();
        await product.save();
        return {"message" : "bought sucessfully"};
        }
    }
  }
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
    filter,
    track,
    _search,
    sellerProducts,
    buy
};