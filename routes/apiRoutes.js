var express = require('express');
var mongoose = require('mongoose');
var apiRouter = express.Router();
var ImageKit = require('imagekit');
var multer = require('multer');
var q = require('q');
var imagekit = new ImageKit({
   "imagekitId" : "rishabhbhatia",       
   "apiKey" 	: "b4cK89DP0xXkRJJiaEp5OIa+wWk=",       
   "apiSecret"  : "GtOezbPqZRDtCj4mQDL9f25hxWc=", 
});

var config = require('../config.js');
var url = config.database;

var db = mongoose.connect(url);
var product = require('../models/products_insert');
var upload = multer().single('image');

apiRouter.route('/')
		.post(function(req, res, next){

			// console.log(parsing.toString())
			//

			/*
			* this will create a new mongoose schema new product
			* .post will now save the data entered by the form to db
			* which can be then access or return by .get
			*/

	upload(req, res, function(err) {
        if(err) {
            console.log(err)
        }
        
        var uploadPromise; var url;
        uploadPromise = imagekit.upload(req.file.buffer.toString('base64'), {
            "filename" : req.file.originalname,
            "folder" : "/images"
        
        });
       
        //handle upload success and failure of image
        uploadPromise.then(function(result) {
        	if(err){console.log(err)}
        	url = result;  //have to add url to mongodb
            console.log(url.url);

        })
        var parsing = req.body.product_name;
		// console.log(parsing);
	 	var str = parsing.toString()
		slug = str.replace(/[,]/g, '-').toLowerCase();
		// console.log(slug);


        product.findOne({myslug: slug}, function(err, productItem) {
		    if (err) {
		        console.log("MongoDB Error: " + err);
		        return false;
		    }
			    if (!productItem) {
			        console.log("No item found, creating product item");

			        product.create(
			            {
			                product_name: req.body.product_name,
			                brand: req.body.brand,
			                category: req.body.category,
			                discription: req.body.discription,
			                url: url
			                
			            }, function(err, createdItem) {
			                if (err) {
			                    console.log("MongoDB Error: " + err);
			                    return null; 
			                }
			                else {
			                	
			                	res.status(200).json(createdItem)
			                }
			            }
			        );
			    }
    		else {
        		console.log("Enter a unique slug .. Found one product item " );
        		res.json(productItem)
        
    		}
    return true;
	})


}); // upload finish
		
})


		.get(function(req, res){
				var query = req.query;
						/* 
						* this query will filter products from url
						* like api/products?brand=apple
						* brand=apple is the query in url
						* and will .get data from db
						*/

		product.find(query, function(err, products){
			if(err){
				res.status(500).send(err);
			}
			else {
				res.json(products)
			}
			});

		});

		apiRouter.route('/:id')
				.get(function(req, res){
					product.findById(req.params.id, function(err, product){
						if(err){
							res.status(500).send(err);
						}
						else {
							res.json(product)
						}
				});
		});
module.exports = apiRouter