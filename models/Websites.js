var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var addWebsiteSchema = new Schema({
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

/*
changes
*filename changed = Webpages
*/

module.exports = mongoose.model('Websites', addWebsiteSchema);