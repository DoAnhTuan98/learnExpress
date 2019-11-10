var express = require('express')
var app = express();
var port = 3000;

var cookieParser = require('cookie-parser')
var userRoute = require('./routes/user.route')
var authRoute = require('./routes/auth.route')
var authMiddleware = require('./middleware/auth.middleware')


app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser());


app.get('/',function(req,res){
    res.render('index')
})

app.use(express.static('public'));

app.use('/users',authMiddleware.requiredAuth,userRoute)

app.use('/auth',authRoute)

app.listen(port,function(){
    console.log('server listening on port' + port);
})