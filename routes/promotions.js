const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the promos to you!');
})
.post((req, res, next) => {
    res.end('Will add the promo: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete((req, res, next) => {
    res.end('Deleting all promos');
});


promoRouter.route('/:promoId')
.all((req,res,next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  next();
})
.get((req,res,next) => {
  console.log('params', req.params)
  res.end(`'Will send promo with id: ${req.params.promoId}`);
})
.post((req, res, next) => {
  res.statusCode = 403;
  res.end(`POST operation not supported on /promotions/id: ${req.params.promoId}`);
})
.put((req, res, next) => {
  res.end(`The promo with id ${req.params.promoId} will be edited with name: ${req.body.name } and description: ${req.body.description}`);
})
.delete((req, res, next) => {
  res.end(`Deleting promo with id: ${req.params.promoId}`);
});

module.exports = promoRouter;