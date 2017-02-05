var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var URLSlugs = require('mongoose-url-slugs');
var add_page = new Schema({

	page_name: {
		type: 'String',
		 default: '', 
		 trim: true
	},
	page_title: {
		type: 'String',
		 default: '', 
		 trim: true
	},
	myslug: {
		type: 'String',
		 default: '', 
		 trim: true
	},

});
// add_page.plugin(URLSlugs('page_name page_title', {field: 'myslug'}));

module.exports = mongoose.model('pages', add_page);