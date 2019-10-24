var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var dateFilter = require('nunjucks-date-filter');
var markdown = require('nunjucks-markdown');
var marked = require('marked');
var sessionInMemory = require('express-session');
var routes = require('./routes/routes');
const utils = require('./utils.js')

const appInsights = require("applicationinsights");


require('dotenv').config()

appInsights.setup(process.env.instrumentationkey);
appInsights.start();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('trust proxy', 1)

var PATH_TO_TEMPLATES = path.join(__dirname, 'views') ;


  let env = nunjucks.configure(PATH_TO_TEMPLATES, {
      autoescape: true,
      express: app
  });

  // note that 'date' is the function name you'll use in the template. As shown in nunjucks-date-filter's readme
  env.addFilter('date', dateFilter);
  markdown.register(env, marked);



app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, '/public')))

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const sessionName = 'gc-service-' + (Buffer.from('prod-ur-service', 'utf8')).toString('hex')
let sessionOptions = {
  secret: sessionName,
  cookie: {
    maxAge: 1000 * 60 * 60 * 4, // 4 hours
    secure: false
  }
}

app.use(sessionInMemory(Object.assign(sessionOptions, {
  name: sessionName,
  resave: false,
  saveUninitialized: false
})))

app.use(utils.autoStoreData)
utils.addCheckedFunction(env)

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log(err.message)
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});


module.exports = app;
