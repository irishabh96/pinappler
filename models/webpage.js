var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var webpage = new Schema({
	websiteName: {
		type: 'String'
	},
	websiteUrl: {
		type: 'String'
	},
	scrappingMethod: {
		type: 'String'
	}

});

module.exports = mongoose.model('webpages', webpage);