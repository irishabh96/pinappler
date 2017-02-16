var express = require('express');
var editRouter = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('../config.js');
var url = config.database;
var db = mongoose.createConnection(url);
var product = require('../models/products_insert');
var page = require('../models/page_insert');


editRouter.route('/:slug')
	
	.get(function(req, res){
			var query = {
				'slug': req.params.slug
			}
		product.findOne(query, function(err, productItem){
			if(productItem){
				res.render('productTableContentEdit', {
					title: 'Product',
			    	data: productItem
				});
			}
			/*
			* if it found slug in products it renders that else render pages
			*/
			if(!productItem){
				page.findOne(query, function(err, pageItem){
					if(pageItem) {
						
						res.render('pageTableContentEdit', {
							title: 'Pages',
					    	data: pageItem
						});
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
                		res.status(500).send('mongo err ' + err);
                	}
                	else{
                		res.json(productItem)
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