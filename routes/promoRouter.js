const express = require("express");
const promotionRouter = express.Router();

promotionRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the promotion to you!');
})
.post((req, res, next) => {
    res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotion');
})
.delete((req, res, next) => {
    res.end('Deleting all promotion');
});

promotionRouter.route('/:promotionId')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end(`Will get the promotion with id ${req.params.promotionId}`);
})
.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /promotion/'+ req.params.promotionId);
})
.put((req, res, next) => {
  res.write('Updating the promotion: ' + req.params.promotionId + '\n');
  res.end('Will update the promotion: ' + req.body.name + 
        ' with details: ' + req.body.description);
})
.delete((req, res, next) => {
  res.end('Deleting promotion: ' + req.params.promotionId);
});

module.exports = promotionRouter;