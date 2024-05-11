var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//haremos instancia de cors
var cors = require('cors')

//agregando middleware
const router = express.Router();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var usersTasks = require('./routes/tasks');
var usersGoals = require('./routes/goals');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//nuestro middleware pasara por todos los endpoints
router.use((req, res, next)=>{
  //verificaremos que haya un header
  if(req.headers.authorization && req.headers.authorization === 'AuthKey123'){
    //si si tiene el header de authorization y tiene 123456 entonces que siga
    next();
  }else{
    //si el key esta mal en el header ahora nos mostrara un codigo de error.
    res.status(401).json({'error': 'no se encontro autorizacion'})
  }
});

//aqui usaremos cors en toda la aplicacion
app.use(cors());
//tambien le diremos que en todas las rutas use el middleware
app.use('/', router);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tasks', usersTasks);
app.use('/goals', usersGoals);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
