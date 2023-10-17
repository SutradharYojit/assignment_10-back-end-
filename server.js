const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const createUser = require('./api/routes/check_auth')
const product = require('./api/routes/product');
const cart = require('./api/routes/cart');
const user = require('./api/routes/users');


app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(morgan('dev'));

app.use('/createUser', createUser);
app.use('/product', product);
app.use('/cart', cart);
app.use('/user', user);



module.exports = app;