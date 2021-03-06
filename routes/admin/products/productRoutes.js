var express = require('express');
var mongoose = require('mongoose');
var productRouter = express.Router();
//var ImageKit = require('imagekit');
//var multer = require('multer');
var q = require('q');
var Websites = require('../websites/websites');
var config = require('../../../config');
// var imagekit = new ImageKit({
//    "imagekitId" : "rishabhbhatia",       
//    "apiKey" 	: "b4cK89DP0xXkRJJiaEp5OIa+wWk=",       
//    "apiSecret"  : "GtOezbPqZRDtCj4mQDL9f25hxWc=", 
// });
// var sltConfig = JSON.stringify(require('./sltConfig').options)
// console.log(sltConfig)

var Products = require('../../../models/Products');

//var upload = multer().single('image');

productRouter.route('/')
		.post(function(req, res, next){
			console.log(req.body);
			// var img_url ;
			// var imagekit_url;
			/*
			* this will create a new mongoose schema new product
			* .post will now save the data entered by the form to db
			* which can be then access or return by .get
			*/

	// upload(req, res, function(err) {
 //        if(err) {
 //            console.log(err)
 //        }
        
        // var uploadPromise; var url;
        // uploadPromise = imagekit.upload(req.file.buffer.toString('base64'), {
        //     "filename" : req.file.originalname,
        //     "folder" : "/images"        
        // });       
        // //handle upload success and failure of image
        // uploadPromise.then(function(result) {
        // 	if(err){console.log(err)}
        // 	imagekit_url = result;  //have to add url to mongodb
        //     console.log(imagekit_url.url);
        //     img_url = url.url;
        //     return(img_url)
        //})
        var slug = req.body.slug;
        var query = {
			'slug': slug
		};

        Products.findOne(query, function(err, productItem) {
		    if (err) {
		        console.log("MongoDB Error: " + err);
		        return false;
		    }
			    if (!productItem) {
			        console.log("No item found, creating product item");

			        	// Important block of code study this one, try using debugger, let me know if any issues in understanding
			        	var websites = req.body.websites;
			        	var websitesData = [];
			        	// for (var i = websites.length - 1; i >= 0; i--) {
			        	// 	websitesData.push({
			        	// 						name : websites[i],
			         //        					url: req.body[websites[i]+'Url']
			         //        				});
			         //    }

			         if(Array.isArray(websites)){
				        	for (var i = websites.length - 1; i >= 0; i--) {
				        		websitesData.push({
				        							name : websites[i],
				                					url: req.body[websites[i]+'Url']
				                				});
				            }
			        	}
			      		else{
			        		websitesData = { 
			        							name : websites, 
			        							url: req.body[websites+'Url']
			        						};
			        	}
			            console.log(websitesData);
			        	///////////////////////////////////////////////////

			    	
			        	Products.create(
				            {
								websites: websitesData,
			                	name: req.body.name,
				                brand: req.body.brand,
				                category: req.body.category,
				                varient: req.body.varient,
				                description: req.body.description,
				                slug: req.body.slug,
				                //url: img_url

					        }, function(err, createdItem) {
				                if (err) {
				                    console.log("MongoDB Error: " + err);
				                    return null; 
				                }
				                else {
				                	res.redirect('/admin/products')
				                }
			            	  }
			        	);
				}			                
			            			    
    		else {
        		console.log("Enter a unique slug .. Found one product item " );
        		res.send('This slug "' + productItem.slug + '" alredy exits in database')
        
    		}
    return true;
	})


// }); // upload finish
		
 })


		.get(function(req, res){
				var query = req.query;
						/* 
						* this query will filter products from url
						* like api/products?brand=apple
						* brand=apple is the query in url
						* and will .get data from db
						*/

		Products.find(query, function(err, products){
			if(err){
				res.status(500).send(err);
			}
			else {
				res.render('products/listProducts', {
				title: 'Products',
		    	thead: ['Name', 'Brand', 'Category', 'Description', 'Slug'],
		    	data: products

				});
			}
		});

	});

productRouter.route('/add')
		.get(function(req,res){

			var productVarients = config.productForm.productVarients;
			var productColors = config.productForm.productColors;			
			Websites.getWebsiteList(function(websitesList){				
				res.render('products/addProduct',{
					title: 'Welcome',
					productVarients: productVarients,
					productColors: productColors,
					websites: websitesList					
				});
			});
					

		});

module.exports = productRouter;