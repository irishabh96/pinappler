var express = require('express');
var mongoose = require('mongoose');
var pageRouter = express.Router();
var bodyParser = require('body-parser');

var Pages = require('../../../models/Pages');

pageRouter.route('/')
		.post(function(req, res){
			var slug = req.body.slug
			console.log(slug);
			var query = {
				slug: slug
			};
			Pages.findOne(query, function(err, item){
				if (err){
					console.log('Mongodb err: ' + err)
				}
				if(!item){
					console.log('No such Page found , creating page..')

					Pages.create(
						{

							name : req.body.name,
							title : req.body.title,
							slug: req.body.slug 

						}, function(err , createditem){
							if (err){
								console.log('mongo err' + err)
							}
							else{
								console.log('Created Successfully')
								// res.status(200).json(createditem)
								res.redirect('/admin/pages')
							}

						}
					);
				}
				else {
					console.log(item.slug + ' This slug Already Exits enter a unique slug')
					res.send('"' + item.slug +'"' +' this slug already exits')
				}
				return true;
			}) // query ending here
		
		}) // post end here
		.get(function(req, res){
			Pages.find(function(err, pages){
				if(err){
					res.status(500).send(err);
				}
				else {
					res.render('pages/listPages',{
						title: 'Pages',
						thead: ['Name', 'Title', 'Slug'],
						data: pages
					});
				}
			});
		});

pageRouter.route('/add')
		.get(function(req, res){
			res.render('pages/addPage',{
				title: 'Add page'
			});
		});

		
module.exports = pageRouter
