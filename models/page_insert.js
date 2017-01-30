var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var add_page = new Schema({

	page_name: {
		type: 'String'
	},
	page_title: {
		type: 'String'
	}

});

module.exports = mongoose.model('pages', add_page);