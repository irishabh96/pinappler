var express     = require('express');
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var path 		= require('path');
var ejs			= require('ejs');
var session = require('express-session');
var expressLayouts = require('express-ejs-layouts');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var flash = require('express-flash');
var expressValidator = require('express-validator');
var MongoStore = require('connect-mongo')(session);

// var paytm = require('./routes/scrape/paytm');


//routes
var adminRoutes = require('./routes/admin/index');
var authRoutes = require('./routes/admin/auth/authRoutes');
var productRoutes = require('./routes/admin/products/productRoutes'); //product route
var pageRoutes = require('./routes/admin/pages/pageRoutes');
var editRoutes = require('./routes/admin/pages/editRoutes');
var websites = require('./routes/admin/websites/websites');

var app = express();

/* EVN setup */
var ENV;
if (process.env.NODE_ENV) {
  ENV = process.env.NODE_ENV
} else {
  ENV = 'development';
}
console.log('The current NODE_ENV is : ' +ENV);

/*mongo connect*/
var config = require('./config.json');
var mongoose  = require('mongoose');
var mongoUri = process.env.MONGOHQ_URL || config[ENV].uri;
db = mongoose.connect(mongoUri);

app.use(morgan('dev')); // status of routes and files in console


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'sec',
  store: new MongoStore({
    url: process.env.MONGODB_URI || config[ENV].uri,
    autoReconnect: true
  })
}));


app.set('views', path.join(__dirname, 'views')); // register view
app.set('view engine','ejs'); //ejs
app.use(expressLayouts);




app.use(flash());
app.use(expressValidator());

app.get('/', function(req, res){
	req.flash('info',{msg: 'welcome'})
	res.send('<a href="/admin">Switch to admin</a>')
})

	

app.use('/admin/pages', pageRoutes);	// base url = admin/pages
app.use('/admin/products', productRoutes);
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/admin/edit', editRoutes);
app.use('/admin/websites', websites);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(error);
});

module.exports = app;
