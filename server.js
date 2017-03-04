var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var path 		= require('path');
var hbs 		= require('hbs');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var paytm = require('./routes/scrape/paytm');
/* EVN setup */
var ENV;
if (process.env.NODE_ENV) {
  ENV = process.env.NODE_ENV
} else {
  ENV = 'development';
}

console.log('The current NODE_ENV is : ' +ENV);

/*mongo connect*/
var mongo = require('./config.json');
var mongoose  = require('mongoose');
var mongoUri = process.env.MONGOHQ_URL || mongo[ENV].uri;
db = mongoose.connect(mongoUri);

/*statis directories*/

app.set('views', path.join(__dirname, 'views')); // register view
app.set('view engine','hbs'); //hbs
hbs.registerPartials(__dirname + '/views/partials'); // registering partials
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res){
	res.send('switch to /auth/pannel or /admin')
})
	

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('dev')); // status of routes and files in console

//routes
var adminRoutes = require('./routes/admin/index');
var authRoutes = require('./routes/admin/auth/authRoutes');
var productRoutes = require('./routes/admin/products/productRoutes'); //product route
var pageRoutes = require('./routes/admin/pages/pageRoutes');
var editRoutes = require('./routes/admin/pages/editRoutes');
var websites = require('./routes/admin/websites/websites');
app.use('/admin/pages', pageRoutes);	// base url = admin/pages
app.use('/admin/products', productRoutes);
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/admin/edit', editRoutes);
app.use('/admin/websites', websites);
module.exports = app;
// router.put('/company/:id', Company.update),