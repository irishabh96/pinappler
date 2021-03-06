var express = require('express')
var mongoose = require('mongoose');
var websiteRoute = express.Router();


var Websites = require('../../../models/Websites');

websiteRoute.getWebsiteList = function(cb){
	Websites.find({}, {websiteName:1, _id:0}, function(err, websites){
			if(err){
				console.log('MongoErr: '+ err);
			}
			cb(websites);
	});
};

websiteRoute.route('/')
	.post(function(req, res){
			Websites.findOne({websiteUrl: req.body.websiteUrl}, function(err, item){
				if (err){
					console.log('Mongodb err: ' + err)
				}
				if(!item){
					console.log('No such model found , creating model..')

					Websites.create(
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
								res.redirect('/admin/websites')
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
		Websites.find({}, function(err, result){
			if(err){
				console.log(err)
			}
			else{
				res.render('websites/listWebsites', {
					title: 'Websites',
					thead: ['Website Name', 'Website Url', 'Scrapping Method'],
					data: result
				})
			}
		});
	});

websiteRoute.route('/delete/:websiteUrl')
	.get(function(req, res){
		var query = {
				'websiteUrl': req.params.websiteUrl
			}
		Websites.findOne(query, function(err, pageDelete){
			if(pageDelete){
				Websites.remove(query, function(err){
					if(err){
						console.log('Mongodb Err product : ' + err)
					}
					else{
						res.redirect('/admin/websites');
					}
				})
			}

			else{
				console.log('No item found to delete')
			}
		})
	});

websiteRoute.route('/edit/:websiteUrl')
	
	.get(function(req, res){
			var query = {
				'websiteUrl': req.params.websiteUrl
			}
		Websites.findOne(query, function(err, result){
			if(result){
				res.render('websites/editWebsites', {
					title: 'Website',
			    	data: result
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
				'websiteUrl': req.params.websiteUrl
			}
		Websites.findOne(query, function(err, editedItem){
			if(editedItem){

				editedItem.websiteName = req.body.websiteName,
                editedItem.websiteUrl = req.body.websiteUrl,
                editedItem.scrappingMethod = req.body.scrappingMethod

                editedItem.save(function(err){
                	if(err){
                		res.status(500).send('mongo err ' + err);
                	}
                	else{
                		res.redirect('/admin/websites')
                	}
                })
                
			}
			if(!editedItem){
				console.log('Not Found')
			}
			else{ 
				console.log('MongoErr: '+ err)
			}
		})
	});	

websiteRoute.route('/add')
		.get(function(req, res){
			res.render('websites/addWebsites',{
				title: 'Add page'
			});
		});

module.exports = websiteRoute;