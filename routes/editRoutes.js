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

editRouter.route('/:id')
	.get(function(req, res){
		res.json(req.product)
			
})
	.put(function(req, res){
		// getting data
			var query = {
				'myslug': req.params.id
			}
			product.findOne(query, function(err, item){
			if(err){
				res.status(500).send(err)
			}
			else{

				item.product_name = req.body.product_name,
                item.brand = req.body.brand,
                item.category = req.body.category,
                item.discription = req.body.discription,
                item.myslug = req.body.myslug

            	item.save();
                res.json(item)
			}
		})

	});

module.exports = editRouter