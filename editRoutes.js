var express = require('express');
var editRouter = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('../config.js');
var url = config.database;
var db = mongoose.createConnection(url);
var page = require('../models/page_insert');
var product = require('../models/products_insert');
// var mongoose = require('mongoose');
// var collections = mongoose.connections[0].collections;
// var names = [];
// Object.keys(collections).forEach(function(k) {
// 			names.push(k);
// 		});
// 		var coll_names = JSON.stringify(names);
const connection = mongoose.connection;
editRouter.use('/:id', function(req, res, next){
	var query = {
				'myslug': req.params.myslug
	 		}
	Object.keys(connection.models).forEach((collection) => {
	  	// console.info(collection);
	  	// this query will find the object in all the collections
	  	connection.models[collection].find(query, function(err, results){
	  		if(err){
	  			console.log("MongoErr: " + err);
	  			res.status(500).send(err)
	  		}
	  		if(results) {
	  			console.log(results)
	  			req.item = results;
	  			next();
	  			}
	  		else {
	  			res.status(404).send(err)
	  		}
	  	});
	})
})

editRouter.route('/:id')
	.get(function(req, res){

			res.json(req.item)
})
// 	.put(function(req, res){
// 		// getting data
// 			var query = {
// 				'myslug': req.params.myslug
// 			}
// 		product.findOne(query, function(err, item){
// 			if(item){
// 				item.product_name = req.body.product_name,
//                 item.brand = req.body.brand,
//                 item.category = req.body.category,
//                 item.discription = req.body.discription,
//                 item.myslug = req.body.myslug,

//             item.save();
//                 console.log(item)
//                 res.json(item)
// 			}
// 			else{
// 				console.log(err)
// 			}
// 		})

// 	});
module.exports = editRouter