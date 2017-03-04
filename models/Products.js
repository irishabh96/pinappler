var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var URLSlugs = require('mongoose-url-slugs');

var websitesListSubSchema = new mongoose.Schema({
    url: String,
    name: String
});

var addProductSchema = new Schema({

	name: {
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
	varient:{
		type: 'String'
	},
	websites: [websitesListSubSchema],
	
	description: {
		type: 'String'
	},
	slug: {
		type: 'String',
		 default: '', 
		 trim: true,
		 required: true
	},
	url: {
		type: 'String'
	}

});

module.exports = mongoose.model('products', addProductSchema);