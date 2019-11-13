// Imports the express package into your file
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');



const UserRoutes = require('./routes/UserRoutes');
const FeedRoutes = require('./routes/FeedRoutes');
const PageRoutes = require('./routes/PageRoutes');
const CompanyRoutes = require('./routes/CompanyRoutes');

const initPassportStrategy = require('./config/passport') // This is a function we have to bring the configuration


// Create an express app
const app = express(); // Using the express function

app.use(bodyParser.urlencoded({extended: false})); //Body Parser sends data
app.use(bodyParser.json());
app.use(passport.initialize()); //passport telling express first time we are using passport
initPassportStrategy(passport); //passport-jwt

// connecting to the data
const db = process.env.MONGO_URI;
mongoose
.connect(db, {useNewUrlParser: true, useUnifiedTopology: true}) //Promise
.then(()=>{
    console.log('DB is connected');
})
.catch((err)=>{
    console.log('error', err)
});
 



app.use(
    '/users', // http://example.com/users/...
    UserRoutes
);

app.use(
    '/feed',
    passport.authenticate('jwt', {session: false}),
    FeedRoutes
);

app.use(
    '/',
    PageRoutes
);

app.use(
    '/company',
        passport.authenticate('jwt', {session: false}),
    CompanyRoutes
);


app.listen(process.env.PORT || 3000, ()=>{ // 3000 is the port number. We connect to an IP address
    console.log('You are connected!')
}) //http://127.0.0.1 (local host)