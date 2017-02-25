var express = require('express');
var adminRouter = express.Router();
var mongoose = require('mongoose');

var product = require('../models/products_insert');
var page = require('../models/page_insert');
var sltConfig = require('./sltConfig').varients;
var chkConfig = require('./sltConfig').checkbox;
console.log(sltConfig + chkConfig)

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
				title: 'Welcome',
				selectfields: sltConfig,
				checkfields: chkConfig
			});
		});

adminRouter.route('/pages/add')
		.get(function(req, res){
			res.render('addPage',{
				title: 'Add page',

			});
		});

adminRouter.route('/webpages/add')
		.get(function(req, res){
			res.render('addwebpages',{
				title: 'Add page'
			});
		});
module.exports = adminRouter;