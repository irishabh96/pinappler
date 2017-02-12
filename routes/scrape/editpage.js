var express = require('express');
var editRouter = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('../config.js');
var url = config.database;
var db = mongoose.createConnection(url);
var product = require('../models/page_insert');

editpage.use('/:id', function(req, res, next){
	var query = {
				'myslug': req.params.id
			}
	page.findOne(query, function(err, page){
		if (err) {
			console.log("mongoDb Err: " + err)
		}
		if(product){
			req.page = page;
			next();
		}
		else{
			
			res.status(404).send('No Such Slug Found');
		}
	});
})