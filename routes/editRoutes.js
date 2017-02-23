var express = require('express');
var editRouter = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

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
					    	pageData: pageItem
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
// update
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
// delete
editRouter.route('/:slug/delete')
	.get(function(req, res){
		var query = {
			'slug': req.params.slug
		}
		product.findOne(query, function(err, productDelete){
			if(productDelete){
				product.remove(query, function(err){
					if(err){
						console.log('Mongodb Err product : ' + err)
					}
					else{
						res.redirect('/admin/products');
					}
				})
			}

			if(!productDelete){
				page.findOne(query, function(err, pageDelete){
					page.remove(query, function(err){
						if(err){
							console.log('Mongodb Err page: '+ err)
						}
						else{
							res.redirect('/admin/pages')
						}
					})
				})
			}
			else{
				console.log('No item found to delete')
			}
		})
	})
module.exports = editRouter