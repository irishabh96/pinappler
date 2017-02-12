var express = require('express');
var adminRouter = express.Router();
var mongoose = require('mongoose');
var Handlebars 		= require('hbs');

var config = require('../config.js');
var url = config.database;

var db = mongoose.createConnection(url);
var page = require('../models/page_insert');
var product = require('../models/products_insert');



adminRouter.route('/')
		.get (function(req, res){
			res.render('admin', {
			title : 'admin',
	 });
});

adminRouter.route('/edit')
		.get (function(req, res){
			res.render('tableContent', {
			title : 'Tables Edit',
	 });
});

/* 

	Products MongoDb call 
	var data is taken globally else it wont be accessable in any other callback

*/

var data;
/* Products Add and view Routes*/

adminRouter.route('/products/add')
		.get(function(req,res){
			res.render('admin_product_create',{
				title: 'Welcome'
			});
		});

adminRouter.route('/products')
		.get(function(req,res){
			product.find({}, function(err, results){
				if(err){
					console.log(err)
				}
				else if(results) {	
					data = results;
				}

			})
			res.render('tableContent', {
				title: 'products',
		    	thead: ['Name', 'Brand', 'Category', 'Discription', 'Slug'],
		    	data: data,

			});
				 	
		})

/* Pages MongoDb call */

var page_data;

/* Pages Add and view Routes*/
adminRouter.route('/pages')
		.get(function(req, res){
			page.find({}, function(err, results){
				if(err){
					console.log(err)
				}
				else if(results) {	
					page_data = results;
				}

			})

			res.render('tableContent',{
				title: 'All pages',
				thead: ['Name', 'Title', 'Slug'],
				page_data: page_data,
			});
		});
	
adminRouter.route('/pages/add')
		.get(function(req, res){
			res.render('admin_page_add',{
				title: 'Add a page'
			});
		});


module.exports = adminRouter;