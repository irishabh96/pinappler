var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var add_product = new Schema({

	product_name: {
		type: 'String'
	},
	brand: {
		type: 'String'
	},
	category: {
		type: 'String'
	},
	discription: {
		type: 'String'
	}

});

module.exports = mongoose.model('products', add_product);