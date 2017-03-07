var Xray = require('x-ray');
var x = Xray();
var mongooose = require('mongoose');
var product = require('../../models/Products');
var price = require('../../models/Price');
var express = require('express');

var regex = /([A-Z])|([a-z])|(s)\w+/g;

var currentDate = new Date();
var priceUpdatedAt = currentDate.toLocaleDateString();;

function myTrim(x) {
    return x.replace(/([A-Z])|([a-z])|(s)\w+/g,'');
}
var currentprice;
var previousPrice;
var urls = [];
product.find({"websites": { $elemMatch: {name: 'amazon'} } }, {websites:1, _id:0}, function(err, result) {
	if(err){
		console.log(err)
	}
	if(result){
		for (var i = result.length - 1; i >= 0; i--) {
		// console.log(result[i])
		// var websites = result.websites
		// console.log(result[i].websites[0].url)
		// console.log(result[i].websites[0]._id)
		// url1 = result[i].websites[0].url;
		urls.push(result[i].websites[0].url)
		
		}

		console.log(urls)
		urls.forEach(function(url, index){
	 	x(url, '._1d5g')(function(err, result){

	 	currentPrice = myTrim(result);
	  	console.log(currentPrice)
	  	
	  	price.findOne({ priceHistory : {$exists: true}  }, function(err, result){
	  			var history = result.priceHistory
	  			
	  			for (var i = history.length - 1; i >= 0; i--) {
	  				history[i]
	  				previousPrice = history[i].price
	  				// console.log(previousPrice)
	  				return previousPrice
	  			}
	  			if (previousPrice == currentPrice){
	  				console.log('the price is same no updation')
	  			}
	  			else{
	  				price.create(
						{
							name: 'snapdeal',
							url: 'snapdeal.com',
							currentPrice: currentPrice,
							priceHistory: {
								priceUpdatedAt: priceUpdatedAt,
								price: '25858'
						},

					}, function(err, created){
						if(!err){
							// console.log(created)
							console.log('items saved')
						}
						else{
							console.log(err)
						}
					})

	  			}
		  	})

	 		})
		})

	}
	else{
		console.log('No such Product found')
	}		

})


var urls1 = [
	'https://paytm.com/shop/p/apple-iphone-5s-16-gb-space-grey-MOBAPPLE-IPHONEHAND209033D861E5F?src=search-grid&tracker=organic%7C66781%7Ciphone%205s%7Cgrid%7CSearch%7C%7C2%7Cproduction&site_id=1&child_site_id=1',
	'https://paytm.com/shop/p/apple-iphone-5s-16-gb-silver-MOBAPPLE-IPHONENEWG19741390DB1436?src=search-grid&tracker=organic%7C66781%7Ciphone%205s%7Cgrid%7CSearch%7C%7C1%7Cproduction&site_id=1&child_site_id=1'
]
