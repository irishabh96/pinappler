var casper = require("casper").create();
//regex
var number = /\d+/g;
//flipkart iphone 6
//flipkart iphone6s

urls = [
	'https://www.flipkart.com/apple-iphone-6-silver-16-gb/p/itme8dvfeuxxbm4r?pid=MOBEYHZ2NUZGCHKN&srno=s_1_1&otracker=search&lid=LSTMOBEYHZ2NUZGCHKN7PMDIN&qH=1f3870be274f6c49',
	'https://www.flipkart.com/apple-iphone-6s-space-grey-32-gb/p/itmen2yyjfzpspyg?pid=MOBEN2YYKU9386TQ&srno=s_1_1&otracker=search&lid=LSTMOBEN2YYKU9386TQCCN1OM&qH=656e7c5dacf682fd',

];



var data = casper.start().eachThen(urls, function(response){
		this.thenOpen(response.data, function(){
		this.echo(this.fetchText("._3ZYEWO ._1vC4OE").match(number));
	});
});


 
casper.run(function() {
    this.echo('Everything in the stack has ended.').exit();
});
