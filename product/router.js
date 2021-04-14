const express = require('express');
const router = express.Router();
const service = require('./service');

router.post('/products' ,service.upload.single('img'), (req, res)=>{
    service.add(req).
    then(result => res.status(200).send({result})).
    catch(err => res.send({err}));
});

router.get('/products' , (req, res)=>{
    service.getAll().
    then(results=> res.status(200).send(results)).
    catch(err=> res.status(400).send(err));
});

router.get('/products/:id' , (req,res)=>{
    service.getOne(req.params.id).
    then(result => res.status(200).send(result)).
    catch(err=> res.status(400).send(err));
});

router.post('/products/delete/:id', (req,res)=>{
    service._delete(req.params.id).
    then(result => res.status(200).send({result})).
    catch(err => res.status(400).send({err}))
})

router.put('/products/:id' , (req, res)=>{
    service._update(req.params.id , req.body).
    then(result => res.status(200).send(result)).
    catch(err=> res.status(400).send({err}));
});

module.exports = router;