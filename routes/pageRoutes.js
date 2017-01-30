var express = require('express');
var mongoose = require('mongoose');
var pageRouter = express.Router();
var bodyParser = require('body-parser');

var config = require('../config.js');
var url = config.database;
var db = mongoose.createConnection(url);
var page = require('../models/page_insert');

pageRouter.route('/')
		.post(function(req, res){

			var Page = new page ({

				"page_name" : req.body.page_name,
				"page_title" : req.body.page_title 

			});
			console.log(Page)
			Page.save();	
			res.status(201).send(Page);

		})
		.get(function(req, res){
			page.find(function(err, pages){
				if(err){
					res.status(500).send(err);
				}
				else {
					res.json(pages)
				}
			});
		});
module.exports = pageRouter
