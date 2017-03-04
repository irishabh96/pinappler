var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var priceHistory = new mongoose.Schema({
    priceUpdatedAt: String,
    price: String
});

var priceAndPriceHistory = new Schema({

	name: {
		type: 'String'
	},
	url:{
		type: 'String'
	},
	currentPrice:{
		type: 'String'
	},

	priceHistory: [priceHistory]

});

module.exports = mongoose.model('price', priceAndPriceHistory);