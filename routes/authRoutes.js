var express = require('express');
var authRouter = express.Router();
// var mongodb = require('mongodb').MongoClient;
// var url = 'mongodb://127.0.0.1:27017/pinapler';



authRouter.route('/')
		.post(function (req, res) {
			console.log(req.body);
			var username = req.body.userName;
			console.log(username);
			mongodb.connect(url, function(err, db){
				var collection = db.collection('users');
				var user = {
				username: req.body.userName,
				password: req.body.password
			};
				collection.findOne({'name': username}, function(err, user){
			if (user){
						//res.redirect('/admin');
						console.log('user already exits');
				}
			else {
					collection.insert(user, function(err, result){
					req.login(result, function(){
					res.redirect('/admin');
					});
				});
			
			}

			
				// console.log('user inserted');
			});
		});
	
	});

// admin route

authRouter.route('/admin')
		.get(function(req, res){
			res.render('admin',{title: 'title'});
	});


module.exports = authRouter;