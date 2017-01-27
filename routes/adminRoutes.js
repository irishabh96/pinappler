var express = require('express');
var adminRouter = express.Router();
// var mongodb = require('mongojs');
// var db = require('./db.js');



adminRouter.route('/')
		.get (function(req, res){
			res.render('admin', {
			title : 'admin',
	 });
});

// admin route add model
adminRouter.route('/add-new-product')
		.get(function(req,res){
			res.render('admin_product_create',{
				title: 'Welcome'
			})
		})
adminRouter.route('/products')
		.get(function(req,res){
			res.render('admin_products',{
				title: 'Welcome'
			})
		})
module.exports = adminRouter;