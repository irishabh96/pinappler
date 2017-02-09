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

// admin route add model
adminRouter.route('/products/add')
		.get(function(req,res){
			res.render('admin_product_create',{
				title: 'Welcome'
			});
		});

var data;
product.find({}, function(err, result){
	if(err){
		console.log(err)
	}
		data = result;
})
adminRouter.route('/products')
		.get(function(req,res){
		    // var thead = {
		    // 	thead: ['Name', 'Brand', 'Category', 'Discription', 'Slug']
		    // }
			res.render('tableContent', {
				title: 'products',
		    	thead: ['Name', 'Brand', 'Category', 'Discription', 'Slug'],
		    	data: data,
		    	
			});
		});

adminRouter.route('/pages')
		.get(function(req, res){
			res.render('tableContent',{
				title: 'All pages',
				thead: ['Name', 'Title', 'Slug']
			});
		});

// add page render		
adminRouter.route('/pages/add')
		.get(function(req, res){
			res.render('admin_page_add',{
				title: 'Add a page'
			});
		});
module.exports = adminRouter;