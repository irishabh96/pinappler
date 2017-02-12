var express = require('express');
var editRouter = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('../config.js');
var url = config.database;
var db = mongoose.createConnection(url);
var product = require('../models/products_insert');

editRouter.use('/:id', function(req, res, next){
		var query = {
				'myslug': req.params.id
			}
		product.findOne(query, function(err, product){
		if (err) {
			console.log("mongoDb Err: " + err)
		}
		if(product){
			req.product = product;
			next();
		}
		else{
			
			res.status(404).send('No Such Slug Found');
		}
	});
})

// get and put

editRouter.route('/:id')
	.get(function(req, res){
		res.json(req.product)
			
	})

	.put(function(req, res){
		// getting data
				req.product.product_name = req.body.product_name,
                req.product.brand = req.body.brand,
                req.product.category = req.body.category,
                req.product.discription = req.body.discription,
                req.product.myslug = req.body.myslug

            	req.product.save();
                res.json(req.product)

	});

module.exports = editRouter