var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var apiRouter = express.Router();

// var config = require('../config.json')
// [process.env.NODE_ENV || 'development'];
var config = require('../config.js');
var url = config.database

var db = mongoose.connect(url);


var product = require('../models/products_insert');


apiRouter.route('/')
		.post(function(req, res){
			/*
			* this will create a new mongoose schema new product
			* .post will now save the data entered by the form to db
			* which can be then access or return by .get
			*/
			var Product = new product(req.body);

			Product.save();
			console.log(Product)
			res.status(201).send(Product)
		})

		.get(function(req, res){
			var query = req.query;
			/* 
			* this query will filter products from url
			* like api/products?brand=apple
			* brand=apple is the query in url
			* and will .get data from db
			*/

			product.find(query, function(err, products){
				if(err){
					res.status(500).send(err);
				}
				else {
					res.json(products)
				}
			});
		});

apiRouter.route('/:id')
		.get(function(req, res){
			product.findById(req.params.id, function(err, product){
				if(err){
					res.status(500).send(err);
				}
				else {
					res.json(product)
				}
			});
		});
module.exports = apiRouter