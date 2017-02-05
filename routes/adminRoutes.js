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
			});
		});
adminRouter.route('/products')
		.get(function(req,res){
			res.render('pages',{
				title: 'Products'
			});
		});

adminRouter.route('/pages')
		.get(function(req, res){
			res.render('pages',{
				title: 'All pages',
				th_name: 'Page Name',
				th_title: 'Page Title',
				th_slug: 'Slug'
			});
		});

// add page render		
adminRouter.route('/pages/add')
		.get(function(req, res){
			res.render('admin_page_add',{
				title: 'add a page'
			});
		});
module.exports = adminRouter;