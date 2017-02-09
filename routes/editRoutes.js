var express = require('express');
var editRouter = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var config = require('../config.js');
var url = config.database;
var db = mongoose.createConnection(url);
var page = require('../models/page_insert');
var product = require('../models/products_insert');



editRouter.route('/:myslug')
	.get(function(req, res){
			var query = {
				'myslug': req.params.myslug
			}
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

})
	.put(function(req, res){
		// getting data
			var query = {
				'myslug': req.params.myslug
			}
		product.findOne(query, function(err, item){
			if(item){
				item.product_name = req.body.product_name,
                item.brand = req.body.brand,
                item.category = req.body.category,
                item.discription = req.body.discription,
                item.myslug = req.body.myslug,

            item.save();
                console.log(item)
                res.json(item)
			}
			else{
				console.log(err)
			}
		})

	})

module.exports = editRouter