

const Cart = require('./cart.model');
const Product = require('../product/product.model')
const Resturaunt = require('../resturaunt/resturaunt.model');

const createCart = async(user, cartBody) => {
    let cart = await Cart.findOne({user: user._id});
    let product = await Product.findById(cartBody.product);
    if(!cart){
        cart = new Cart({
            user : user._id
        })
    }
    if(product){
        cart.products.push(product._id);
        cart.total += product.price;
    }
    else return { status:200, isSucces: false, data:{}, message:"invalid product"  }

    await cart.save(); 
    return { status:200, isSucces: true, data:cart, message:"product added to cart"  }
}

const removeItem = async (user, cartBody) => {
    let cart = await Cart.findOne({ user: user._id });
    let product = await Product.findById(cartBody.product);
    if (!cart) return { status: 200, isSucces: false, data: {}, message: "cart does not exist against this user" };
    if (!product) return { status: 200, isSucces: false, data: {}, message: "product does not exist" };

    const index = cart["products"].indexOf(product._id);
    if (index > -1) {
        cart["products"].splice(index, 1);
        cart["price"] -= product.price;
        await cart.save();
    }
    return { status:200, isSucces: true, data:cart, message:"product removed from cart"  }
}

module.exports = {
    createCart,
    removeItem
}