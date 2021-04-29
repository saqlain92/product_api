const express   = require('express');
const Router    = express.Router();
const service   = require('../user/service');
const authorize = require('../helpers/authorize');
const product   = require('../product/service');


Router.post('/products',authorize("Admin"), product.upload.single('img'),product.validate, (req, res, next)=>{
    product.add(req, next).
    then(result => res.status(200).send({result})).
    catch(err => next(err));
});

Router.post('/products/buy', authorize("Customer"), (req, res, next)=>{
    res.status(200).send("You are authorized to buy products");
})

Router.get('/products' ,  (req, res, next)=>{
    product.getAll().
    then(results=> res.status(200).send(results)).
    catch(err=> next(err));
});

Router.get('/products/:id', (req,res,next)=>{
    product.getOne(req.params.id).
    then(result => res.status(200).send(result)).
    catch(err=> next(err));
});

Router.delete('/products/:id/delete',authorize("Admin"), (req, res, next)=>{
    product._delete(req.params.id).
    then(result => res.status(200).send({result})).
    catch(err => next(err));
})

Router.put('/products/:id' ,authorize("Admin"), (req, res, next)=>{
    product._update(req.params.id , req.body).
    then(result => res.status(200).send(result)).
    catch(err=> next(err));
});

Router.get('/products/filter/:des', (req, res, next)=>{
    product.filter(req.params.des).
    then(results => res.status(200).send(results)).
    catch(err => next(err));
})

module.exports = Router;