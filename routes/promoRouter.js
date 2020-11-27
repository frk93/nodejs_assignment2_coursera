const express = require("express");
const bodyParser = require('body-parser');
const Promotion = require('../models/promotions');

const promotionRouter = express.Router();
promotionRouter.use(bodyParser.json()); 

promotionRouter.route('/')
.get((req,res,next) => {
    Promotion.find({}).then(val => {
        res.json(val);
    }).catch(err => {
        throw new Error(err);
    });
})
.post((req, res, next) => {
    const newPost = req.body;
    Promotion.create(newPost).then(val => {
        console.log('Promotion Created ', val);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(val);
    }).catch(err => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /Promotion');
})
.delete((req, res, next) => {
    Promotion.remove({}).then(val => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(val);
    }).catch(err => next(err));
    res.end('Deleting all Promotions');
});

promotionRouter.route('/:promotionId')
.get((req,res,next) => {
    const PromotionId = req.params.promotionId;
    Promotion.findById(PromotionId).then(val => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(val);
    }).catch(err => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /Promotion/'+ req.params.PromotionId);
})
.put((req, res, next) => {
    const PromotionId = req.params.PromotionId;
    Promotion.findByIdAndUpdate(PromotionId,{ $set: req.body}, {new: true}).then(val => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(val);
    }).catch(err => next(err))
})
.delete((req, res, next) => {
    Promotion.findByIdAndRemove(req.params.promotionId).then(val => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(val);
    }).catch(err => next(err))
    res.end('Deleting Promotion: ' + req.params.promotionId);
});

module.exports = promotionRouter;