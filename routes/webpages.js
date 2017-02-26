var express = require('express')
var mongoose = require('mongoose');
var webpageRoute = express.Router();

// use "Website" instead of Model -- same goes for file name, (while for **Models** --- try using First capital + camel case in model names)
var model = require('../models/webpage');

// take care of naming convention its very important when codebase becomes large
// here "webpage" is model name while everywhere else is website

// Init function or looking for a better way to do this. not sure
// (function(){
// 	model.find({}, {websiteName:1, _id:0}, function(err, websites){
// 			if(err){
// 				console.log('MongoErr: '+ err);
// 			}
// 			//console.log(websites);
// 			webpageRoute.websitesList = websites;
// 	});
// })();

webpageRoute.getWebsiteList = function(cb){
	model.find({}, {websiteName:1, _id:0}, function(err, websites){
			if(err){
				console.log('MongoErr: '+ err);
			}
			cb(websites);
	});
};

webpageRoute.route('/')
	.post(function(req, res){
			model.findOne({websiteUrl: req.body.websiteUrl}, function(err, item){
				if (err){
					console.log('Mongodb err: ' + err)
				}
				if(!item){
					console.log('No such model found , creating model..')

					model.create(
						{

							websiteName : req.body.websiteName,
							websiteUrl : req.body.websiteUrl,
							scrappingMethod: req.body.scrappingMethod 

						}, function(err , createditem){
							if (err){
								console.log('mongo err' + err)
							}
							else{
								console.log('Created Successfully')
								// res.status(200).json(createditem)
								res.redirect('/admin/webpages')
							}

						}
					);
				}
				else {
					console.log(item.websiteUrl + ' This websiteUrl Already Exits enter a unique websiteUrl')
					res.send('"' + item.websiteUrl +'"' +' this websiteUrl already exits')
				}
				return true;
			}) // query ending here
		
		}) // post end here
	.get(function(req, res){
		model.find({}, function(err, result){
			if(err){
				console.log(err)
			}
			else{
				res.render('webpageContent', {
					title: 'Webpages',
					thead: ['Website Name', 'Website Url', 'Scrapping Method'],
					data: result
				})
			}
		});
	});

webpageRoute.route('/delete/:websiteUrl')
	.get(function(req, res){
		var query = {
				'websiteUrl': req.params.websiteUrl
			}
		model.findOne(query, function(err, pageDelete){
			if(err){
				console.log('MongoErr: '+ err)
			}
			if(pageDelete){
				model.remove(query, function(err){
					if(err){
						console.log('Mongodb Err product : ' + err)
					}
					else{
						res.redirect('/admin/webpages');
					}
				})
			}

			else{
				console.log('No item found to delete')
			}
		})
	});

webpageRoute.route('/edit/:websiteUrl')
	
	.get(function(req, res){
			var query = {
				'websiteUrl': req.params.websiteUrl
			}
		model.findOne(query, function(err, editItem){
			if(editItem){
				res.render('webpageContentEdit', {
					title: 'Webpages',
			    	data: editItem
				});
			}
			else{ 
				console.log('No such URl')
			}
		})
	})
// update
	.post(function(req, res){
		var query = {
				'slug': req.params.slug
			}
		model.findOne(query, function(err, editedItem){
			if(editedItem){

				editedItem.websiteName = req.body.websiteName,
                editedItem.websiteUrl = req.body.websiteUrl,
                editedItem.scrappingMethod = req.body.scrappingMethod

                editedItem.save(function(err){
                	if(err){
                		res.status(500).send('mongo err ' + err);
                	}
                	else{
                		res.redirect('/admin/webpages')
                	}
                })
                
			}
			if(err){
				console.log(err)
			}
			else{ 
				console.log('No such EDIT URL')
			}
		})
	});	

module.exports = webpageRoute;