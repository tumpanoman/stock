const express = require('express');
const app = express();
const path = require('path');
const passport = require('passport');
const {check} = require('./config/auth');


const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');

app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')

app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true, cookie: { secure: false, maxAge: 5 * 365 * 24 * 60 * 60 * 1000 } }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/user', check(), userRouter);


app.listen(3000, () => {
    console.log(('Server is Running').yellow);
});




