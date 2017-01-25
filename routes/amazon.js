var casper = require("casper").create();

var urls = [
	'http://www.amazon.in/Apple-iPhone-5s-Space-Grey/dp/B00FXLC9V4/ref=sr_1_1?ie=UTF8&qid=1485199933&sr=8-1&keywords=iphone+5s'
];
 
var data = casper.start().eachThen(urls, function(response){
		this.thenOpen(response.data, function(){
		this.echo(this.fetchText("#priceblock_dealprice"));
	});
});
casper.run(function() {
    this.echo('Everything in the stack has ended.').exit();
});
