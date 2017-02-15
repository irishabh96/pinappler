var express = require('express');
var editRouter = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('../config.js');
var url = config.database;
var db = mongoose.createConnection(url);
var product = require('../models/products_insert');
var page = require('../models/page_insert');
// editRouter.use('/:slug', function(req, res, next){
// 		var query = {
// 				'slug': req.params.slug
// 			}
// 		product.findOne(query, function(err, product){
// 		if (err) {
// 			console.log("mongoDb Err: " + err)
// 		}
// 		if(product){
// 			req.product = product;
// 			next();
// 		}
// 		else{
			
// 			res.status(404).send('No Such Slug Found');
// 		}
// 	});
// })

// // get and put

// editRouter.route('/:slug')
// 	.get(function(req, res){
// 		res.json(req.product)
			
// 	})

// 	.put(function(req, res){
// 		// getting data
// 				   req.product.product_name = req.body.product_name,
//                 req.product.brand = req.body.brand,
//                 req.product.category = req.body.category,
//                 req.product.discription = req.body.discription,
//                 req.product.slug = req.body.slug

//             	req.product.save();
//                 res.json(req.product)

// 	});

editRouter.route('/:slug')
	
	.get(function(req, res){
			var query = {
				'slug': req.params.slug
			}
		product.findOne(query, function(err, productItem){
			if(productItem){
				res.json(productItem)
			}
			if(!productItem){
				page.findOne(query, function(err, pageItem){
					if (pageItem) {
						
						res.json(pageItem)
					}
					else{
							console.log('no slug in page')
						}

				})
			}
			else{ 
				console.log('No such slug')
			}
		})
	})

	.post(function(req, res){
		var query = {
				'slug': req.params.slug
			}
		product.findOne(query, function(err, productItem){
			if(productItem){
				productItem.product_name = req.body.product_name,
                productItem.brand = req.body.brand,
                productItem.category = req.body.category,
                productItem.discription = req.body.discription,
                productItem.slug = req.body.slug

                productItem.save(function(err){
                	if(err){
                		res.status(500).send(err);
                	}
                	else{
                		res.redirect('/admin/products')
                	}
                })
			}
			if(!productItem){
				page.findOne(query, function(err, pageItem){
					if (pageItem) {
						
						pageItem.page_name = req.body.page_name,
						pageItem.page_title = req.body.page_title,
						pageItem.slug = req.body.slug

						pageItem.save(function(err){
							if(err){
								res.status(500).send(err);
							}
							else{
								res.redirect('/admin/pages')
							}
						})
					}
					else{
							console.log('no slug in page')
						}

				})
			}
			else{ 
				console.log('No such slug')
			}
		})
	})

module.exports = editRouter