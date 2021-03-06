var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var passport = require('passport');
var authenticate = require('./authenticate');
var config = require('./config');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishesRouter = require('./routes/dishes');
var leadersRouter = require('./routes/leaders');
var promotionsRouter = require('./routes/promotions');
const uploadRouter = require('./routes/upload');
const favoriteRouter = require('./routes/favorite');
const commentRouter = require('./routes/comments');

const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

// const url = process.env['MONGO_URL'] || 'mongodb://localhost:27017/konfusion';
const url = process.env['MONGO_URL'] || config.mongoUrl;
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log("Connected correctly to server db");
}, (err) => { console.log(err); });

var app = express();

// Secure traffic only
app.all('*', (req, res, next) => {
  // Commented to heroku app because proxy send the data after proxy certificate
  // if (req.secure) return next();
  // res.redirect(307, 'https://' + req.hostname + ':' + app.get('secPort') + req.url);

   return next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(cookieParser('12345-67890-09876-54321'));

// For session based auth version:
// app.use(session({
//   name: 'session-id',
//   secret: '12345-67890-09876-54321',
//   saveUninitialized: false,
//   resave: false,
//   store: new FileStore()
// }));

app.use(passport.initialize());

// For session based auth version:
// app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// V:3
// For session based auth version:
// function auth(req, res, next) {
//   console.log(req.user);

//   if (!req.user) {
//     var err = new Error('You are not authenticated!');
//     err.status = 403;
//     next(err);
//   }
//   else {
//     next();
//   }
// }

// V: 2
// function auth(req, res, next) {
//     console.log(req.session);

//     if (!req.session.user) {
//         var err = new Error('You are not authenticated!');
//         err.status = 403;
//         return next(err);
//     }
//     else {
//         if (req.session.user === 'authenticated') {
//             next();
//         }
//         else {
//             var err = new Error('You are not authenticated!');
//             err.status = 403;
//             return next(err);
//         }
//     }
// }

// V: 1
// function auth (req, res, next) {
//     console.log(req.session);

//     if (!req.session.user) {
//         var authHeader = req.headers.authorization;
//         if (!authHeader) {
//             var err = new Error('You are not authenticated!');
//             res.setHeader('WWW-Authenticate', 'Basic');
//             err.status = 401;
//             next(err);
//             return;
//         }
//         var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
//         var user = auth[0];
//         var pass = auth[1];
//         if (user == 'admin' && pass == 'password') {
//             req.session.user = 'admin';
//             next(); // authorized
//         } else {
//             var err = new Error('You are not authenticated!');
//             res.setHeader('WWW-Authenticate', 'Basic');
//             err.status = 401;
//             next(err);
//         }
//     }
//     else {
//         if (req.session.user === 'admin') {
//             console.log('req.session: ',req.session);
//             next();
//         }
//         else {
//             var err = new Error('You are not authenticated!');
//             err.status = 401;
//             next(err);
//         }
//     }
// }

// app.use(auth);

// For session based auth version:
// app.use(auth);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/dishes', dishesRouter);
app.use('/leaders', leadersRouter);
app.use('/promotions', promotionsRouter);
app.use('/imageUpload', uploadRouter);
app.use('/favorites', favoriteRouter);
app.use('/comments', commentRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
