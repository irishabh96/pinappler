var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var path 		= require('path');
var hbs 		= require('hbs');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
// var apiRoutes   = express.Router();
//public directory
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views')); // register view
app.set('view engine','hbs'); //hbs
hbs.registerPartials(__dirname + '/views/partials'); // registering partials

app.get('/', function(req, res){
	res.send('switch to /auth/pannel or /admin')
})
	

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({secret: 'hello'}));
require('./config/passport_config.js') (app);
//routes
var adminRoutes = require('./routes/adminRoutes');
var authRoutes = require('./routes/authRoutes');
var productRoutes = require('./routes/productRoutes'); //product route
var pageRoutes = require('./routes/pageRoutes');
app.use('/api/pages', pageRoutes);	// base url = api/pages
app.use('/api/products', productRoutes);
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
// var config = require('./config/config.js'); // get our config file
// var User   = require('./models/user');

//port and database
var port = process.env.PORT || 3000 ;
// mongoose.connect(config.database);






app.listen(port ,function(){
	console.log('listening to port specified ' + port)
});