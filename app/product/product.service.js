const Product = require('./product.model');
const Resturaunt = require('../resturaunt/resturaunt.model');

const createProduct = async(user, productBody) => {
    const newProduct = new Product({
        productName: productBody.productName,
        seller : user._id
        // sku: slugify(`${Math.random().toString(8).replace('0.', '')}-`),
        // slug: slugGenerator(productBody.productName)
    })
    const resturaunt = await Resturaunt.findOne({owner: user._id})
    if(!resturaunt) return { status: "400", success: "false", result: {}, message: "this user has not any resturaunt" }
    newProduct.resturaunt = resturaunt._id;
    if (productBody.mainProduct) {
        const mainProduct = await Product.findById(productBody.mainProduct)
        if (!mainProduct) {
            return { status: "200", success: "false", result: {}, message: "main product not found" }
        }
        if (mainProduct.seller._id != user._id) {
            return { status: "200", success: "false", result: {}, message: "this user is unauthorized to add product" }
        }
        newProduct.mainProduct = mainProduct.id;
        newProduct.productType = 'variant';
    }

    if (user.role === "requestedSeller") {
        newProduct.active = false;
    }
    const product = await Product.create(newProduct);

    return { status: "200", success: "true", result: product, message: "product created successfully" }

}

module.exports = {
    createProduct
}