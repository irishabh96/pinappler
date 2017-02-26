var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var URLSlugs = require('mongoose-url-slugs');

var websitesListSubSchema = new mongoose.Schema({
    url: String,
    name: String
});

var addProductSchema = new Schema({

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
	varient:{
		type: 'String'
	},
	websites: [websitesListSubSchema],	

		//****************************
		//you can use this
		//type : Array , "default" : []
		//or create a sub schema		

		// kya hai ye bc ... 
		// docs dekh lia kar
		// http://mongoosejs.com/docs/2.7.x/docs/model-definition.html
		// jab bhi code mein paytm likha toh samjh jaa kuch gadbad hai
		// paytm:{
		// 	Url: {
		// 		type: 'String',
		// 	}
		// },
		// flipkart:{
		// 	Url: {
		// 		type: 'String',
		// 	}
		// },
		// amazon:{
		// 	Url: {
		// 		type: 'String'
		// 	}
		// }

	discription: {
		type: 'String'
	},
	slug: {
		type: 'String',
		 default: '', 
		 trim: true
	},
	url: {
		type: 'String'
	}

});
// add_product.plugin(URLSlugs('product_name', {field: 'myslug'}));
module.exports = mongoose.model('products', addProductSchema);