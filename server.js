// Imports the express package into your file
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const UserModel = require('./models/UserModel');
const FeedModel = require('./models/FeedModel');
// Create an express app
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const db = 'mongodb+srv://hassan3924:Pronational1@cluster0-mzvaf.mongodb.net/test?retryWrites=true&w=majority';
mongoose
.connect(db, {useNewUrlParser: true, useUnifiedTopology: true}) //Promise
.then(()=>{
    console.log('DB is connected');
})
.catch((err)=>{
    console.log('error', err)
})
 
/*
    Our first route
    First argument: route address
    Second argument: callback
*/
app.get('/', (req, res)=>{
    res.send("<h1>Welcome Home</h1>")
})

app.get('/about', (req, res)=>{

    res.send(`
                <h1>About Page</h1>
                <p>${req.query.section}</p>
                <p>${req.query.year}</p>
                <p>${req.query.industry}</p>
    `)

});

app.get('/contact', (req, res)=>{
    res.send("<h1>Contact Page</h1>")
});

app.get('/blog/:page', (req, res)=>{
    const page = req.params.page;
    res.send("<h1>Welcome to " + page + "</h1>")
});

app.post('/register', (req, res)=>{

    const formData = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        password : req.body.password
    }

    const newUser = new UserModel(formData);

    newUser
    .save() // Promise

    // If promise is fulfilled
    .then((newUserData)=>{
        // Send response in the form of JSON
        res.json(newUserData)
    })

    // Otherwise...
    .catch((err)=>{
        console.log('error', err);
    })
});

app.post('/feed', (req, res)=>{
    const formData = {
        username: req.body.username,
        comment: req.body.comment,
        tags: req.body.tags,
        image: req.body.image
    }

    const newFeed = new FeedModel(formData);

    newFeed
    .save()
    .then(newFeedData=>{
        res.json(newFeedData);
    })
    .catch(err=>{
        res.json(err)
    });

});

app.post('/feed/addlike', async (req, res)=>{
    
    let userLikes;
    let theFeedID = req.body.feedid;

    // 1. Get the document with matching id
    let theDocument = await FeedModel
    .find({_id: theFeedID}) // promise
    .catch(err =>{
        res.send(err)
    })
    

    // 2. Extract the likes from the document
    userLikes = theDocument[0].likes;

    // 3. Push the new like to the array
    userLikes.push(req.body.userid);

    // 4. Update the document
    FeedModel
    .updateOne(
        {_id: theFeedID},
        {likes: userLikes}
    ) //promise
    .then(theFeed=>{
        res.json(theFeed)
    })
    .catch(err=>{
        res.json(err)
    });



});

app.listen(3000, ()=>{
    console.log('You are connected!')
})