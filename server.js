// Imports the express package into your file
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/User');
const Feed = require('./models/Feed');
// Create an express app
const app = express();
 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const db = 'mongodb+srv://hassan3924:Pronational1@cluster0-mzvaf.mongodb.net/test?retryWrites=true&w=majority';
mongoose
.connect(db, {useNewUrlParser: true, useUnifiedTopology: true}) //Promise  
.then(() => {
    console.log('DB is connected');
})
.catch((err)=> {
    console.log('error', err );
});



/* Our first route 
 First argument 
 Second argument: callback
 */
app.get('/', (req, res)=> {

    res.send(`<h1>Welcome Home</h1>
    <p>${req.query.section}</p>

    <p>${req.query.year}</p>

    <p>${req.query.industry}</p>
    `);
});

app.get('/about', (req, res)=> {
    
    res.send("<h1>About Page</h1>");
   
});

app.get('/contact', (req, res)=> {
    res.send("<h1>Contact Page </h1>");
});

// ":" turns dynamic into a variable

app.get('/blog/:page', (req, res)=> {

    const page = req.params.page;
    res.send("<h1>Welcome to " + page + "</h1>");
});

app.post('/register',(req, res)=>{
    
    
        const formData = {
         firstName : req.body.firstName,
         lastName : req.body.lastName,
         email : req.body.email,
         password : req.body.password


        };
        const newUser = new User(formData);

newUser
.save() // Promise

// If promise if fulfilled
.then((newUserData) => {
    // Send response in the form of JSON
    res.json(newUserData);

    // Otherwise...
})
.catch((err) => {
    console.log('error', err);
});
});

app.post('/Feed',(req,res)=>{
    const feedData ={
        userName : req.body.userName,
        comment : req.body.comment,
        tags : req.body.tags,
        image : req.body.image,
        likes: req.body.likes,
        shares: req.body.shares,
        date: req.body.date
    };
    const newFeed = new Feed(feedData);

    newFeed
    .save() // Promise
    
    // If promise if fulfilled
    .then((newFeedData) => {
        // Send response in the form of JSON
        res.json(newFeedData);
    
        // Otherwise...
    })  
    .catch((err) => {
        console.log('error', err);
    });
    
});






/* If you are connected (you are connected will show! ) 
 without it you won't be able to tell if you are connected*/

app.listen(3000, () => {           
    console.log('You are connected!');
    console.log("Hooray!");
});



