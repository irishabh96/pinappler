var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var URLSlugs = require('mongoose-url-slugs');

var addPageSchema = new Schema({

	name: {
		type: 'String',
		 default: '', 
		 trim: true
	},
	title: {
		type: 'String',
		 default: '', 
		 trim: true
	},
	slug: {
		type: 'String',
		 default: '', 
		 trim: true,
		 required: true
	},

});

/* changes 
* page_name = name
*file name changed page_insert = Pages
*/
// add_page.plugin(URLSlugs('page_name page_title', {field: 'myslug'}));

module.exports = mongoose.model('pages', addPageSchema);