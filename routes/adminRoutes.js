var express = require('express');
var adminRouter = express.Router();
// var mongodb = require('mongojs');
// var db = require('./db.js');



adminRouter.route('/')
		.get (function(req, res){
			res.render('signin', {
			title : 'Signin',
	 });
});

// admin route add model
adminRouter.route('/addmodel')
		.get(function(req,res){
			db.model.insert(url, function(err, data){
				if (err){
					console.log(err)
				};
			// attach data url	console.log('data inserted')
			});
		});


module.exports = adminRouter;