
const cartService = require("./cart.service");
const catchAsync = require("../helpers/catchAsync");
const httpStatus = require("http-status");
const pick = require("../helpers/pick");
const sanitize = require("../helpers/sanitize");

const createCart = catchAsync(async (req, res, next) => {
    const result = await cartService.createCart(req.user, req.body);
    res.status(httpStatus.CREATED).send(result);
});

const removeItem = catchAsync(async (req, res, next) => {
    const result = await cartService.removeItem(req.user, req.body);
    res.status(httpStatus.CREATED).send(result);
});

module.exports = {
    createCart,
    removeItem
}