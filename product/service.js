const mongoose = require('mongoose');
const Product = require('./model');
const multer = require('multer');
var uploadDir = require('path').join(__dirname, '/uploads/');
const path = require('path');
var fs = require('fs');

async function add(req) {
    try {

        if (req.body.name) {
            let baseDir = 'E:/Vintega Projects/testApi/uploads/';
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
        return err;
    }
}

async function getAll(l = 5) {

    return await Product.find().limit(l);
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
    const product = await Product.findById(id, productParams);
    if (product && productParams) {
        Object.assign(product, productParams);
        return await product.save();
    }
    return "invalid arguments";
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

var upload = multer({ storage: storage });

module.exports = {
    add,
    getAll,
    getOne,
    _delete,
    _update,
    upload
};