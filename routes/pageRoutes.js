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
			var parsing = [req.body.page_name,
						req.body.page_title];
			// console.log(parsing.toString())
			var str = parsing.toString()
			slug = str.replace(/[,]/g, '-').toLowerCase();
			console.log(slug);

			page.findOne({myslug: slug}, function(err, item){
				if (err){
					console.log('Mongodb err: ' + err)
				}
				if(!item){
					console.log('No such Page found , creating page..')

					page.create(
						{

							page_name : req.body.page_name,
							page_title : req.body.page_title 

						}, function(err , createditem){
							if (err){
								console.log('mongo err' + err)
							}
							else{
								console.log('Created Successfully')
								res.status(200).json(createditem)
							}

						}
					);
				}
				else {
					console.log(req.body.page_name + ' ' + req.body.page_title + ' This slug Already Exits enter a unique slug')
					res.json(item)
				}
				return true;
			}) // query ending here
		
		}) // post end here
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
