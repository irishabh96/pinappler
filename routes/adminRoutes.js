var express = require('express');
var adminRouter = express.Router();
var mongoose = require('mongoose');
var Handlebars = require('hbs');
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

var data;
/* Products Add and view Routes*/

adminRouter.route('/products/add')
		.get(function(req,res){
			res.render('admin_product_create',{
				title: 'Welcome'
			});
		});

adminRouter.route('/pages/add')
		.get(function(req, res){
			res.render('admin_page_add',{
				title: 'Add a page'
			});
		});


module.exports = adminRouter;