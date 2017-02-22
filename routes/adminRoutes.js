var express = require('express');
var adminRouter = express.Router();
var mongoose = require('mongoose');

var product = require('../models/products_insert');
var page = require('../models/page_insert');

adminRouter.route('/')
		.get (function(req, res){
			res.render('admin', {
			title : 'admin',
	 });
});

/* Products and pages Add */

adminRouter.route('/products/add')
		.get(function(req,res){
			res.render('addProduct',{
				title: 'Welcome'
			});
		});

adminRouter.route('/pages/add')
		.get(function(req, res){
			res.render('addPage',{
				title: 'Add page'
			});
		});


module.exports = adminRouter;