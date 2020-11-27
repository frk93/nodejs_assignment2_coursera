const express = require("express");
const bodyParser = require('body-parser');
const Leader = require("../models/leader");

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.get((req,res,next) => {
    Leader.find({}).then(val => {
        res.json(val);
    }).catch(err => {
        throw new Error(err);
    });
})
.post((req, res, next) => {
    const newPost = req.body;
    Leader.create(newPost).then(val => {
        console.log('Leader Created ', val);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(val);
    }).catch(err => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leader');
})
.delete((req, res, next) => {
    Leader.remove({}).then(val => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(val);
    }).catch(err => next(err));
    res.end('Deleting all leader');
});

leaderRouter.route('/:leaderId')
.get((req,res,next) => {
    const leaderId = req.params.leaderId;
    Leader.findById(leaderId).then(val => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(val);
    }).catch(err => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /leader/'+ req.params.leaderId);
})
.put((req, res, next) => {
    const leaderId = req.params.leaderId;
    Leader.findByIdAndUpdate(leaderId,{ $set: req.body}, {new: true}).then(val => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(val);
    }).catch(err => next(err))
})
.delete((req, res, next) => {
    Leader.findByIdAndRemove(req.params.leaderId).then(val => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(val);
    }).catch(err => next(err))
    res.end('Deleting leader: ' + req.params.leaderId);
});

module.exports = leaderRouter;