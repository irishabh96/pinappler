var express = require('express');
var editRouter = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Products = require('../../../models/Products');
var Pages = require('../../../models/Pages');


editRouter.route('/:slug')
	
	.get(function(req, res){
			var query = {
				'slug': req.params.slug
			}
		Products.findOne(query, function(err, productItem){
			if(productItem){
				res.render('products/editProduct', {
					title: 'Product',
			    	data: productItem
				});
			}
			/*
			* if it found slug in products it renders that else render pages
			*/
			if(!productItem){
				Pages.findOne(query, function(err, pageItem){
					if(pageItem) {
						
						res.render('pages/editPage', {
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
		Products.findOne(query, function(err, productItem){
			if(productItem){

				productItem.name = req.body.name,
                productItem.brand = req.body.brand,
                productItem.category = req.body.category,
                productItem.description = req.body.description,
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
				Pages.findOne(query, function(err, pageItem){
					if (pageItem) {
						
						pageItem.name = req.body.name,
						pageItem.title = req.body.title,
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
		Products.findOne(query, function(err, productDelete){
			if(productDelete){
				Products.remove(query, function(err){
					if(err){
						console.log('Mongodb Err product : ' + err)
					}
					else{
						res.redirect('/admin/products');
					}
				})
			}

			if(!productDelete){
				Pages.findOne(query, function(err, pageDelete){
					Pages.remove(query, function(err){
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