var casper = require("casper").create();
var number = /\d+/g;

//paytm iphone 6

urls = [
	'https://paytm.com/shop/p/apple-iphone-6-CMPLXAPPLE_IPHONE6_16GB_SPACEGREY',
	'https://paytm.com/shop/p/apple-iphone-6-16-gb-silver-MOBAPPLE-IPHONESTRI2736844A5C3DE5?src=search-grid&tracker=organic%7C%7Ciphone%206%7Cgrid%7CSearch%7C%7C4%7Creal_time_scoring_1'
];

casper.start().eachThen(urls, function(response){
var data = this.thenOpen(response.data, function(){
		this.echo(this.fetchText("#site-wrapper > div.view-animate-container > div > span > div > span > div.big-wrapper-pro > div:nth-child(1) > div.img-description > div.buy-bar > button:nth-child(1) > span:nth-child(1) > span").match(number));
	});							

});


 
casper.run(function() {
    this.echo('Everything in the stack has ended.').exit();
});