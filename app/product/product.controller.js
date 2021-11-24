const productService = require("./product.service");
const catchAsync = require("../helpers/catchAsync");
const httpStatus = require("http-status");
const pick = require("../helpers/pick");
const sanitize = require("../helpers/sanitize");

const createProduct = catchAsync(async (req, res, next) => {
    const result = await productService.createProduct(req.user, req.body);
    res.status(httpStatus.CREATED).send(result);
});

module.exports = {
    createProduct
}