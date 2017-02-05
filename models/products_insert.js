var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var URLSlugs = require('mongoose-url-slugs');

var add_product = new Schema({

	product_name: {
		type: 'String',
		 default: '', 
		 trim: true
	},
	brand: {
		type: 'String'
	},
	category: {
		type: 'String'
	},
	discription: {
		type: 'String'
	},
	myslug: {
		type: 'String',
		 default: '', 
		 trim: true
	},
	url: {
		type: 'String'
	}

});
// add_product.plugin(URLSlugs('product_name', {field: 'myslug'}));
module.exports = mongoose.model('products', add_product);