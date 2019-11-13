require('dotenv').config();

var express = require('express')
var app = express();
var port = 3000;

var cookieParser = require('cookie-parser')
var userRoute = require('./routes/user.route')
var authRoute = require('./routes/auth.route')
var cartRoute = require('./routes/cart.route')
var authMiddleware = require('./middleware/auth.middleware')
var products = require('./routes/product.route')
var sessionMiddleware = require('./middleware/session.middleware')


app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);

app.get('/',function(req,res){
    res.render('index')
})

app.use(express.static('public'));

app.use('/users',authMiddleware.requiredAuth,userRoute)

app.use('/auth',authRoute)

app.use('/products',products)

app.use('/cart',cartRoute)


app.listen(port,function(){
    console.log('server listening on port' + port);
})