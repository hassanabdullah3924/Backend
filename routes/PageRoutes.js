const express = require('express');
const router = express.Router(); // We just want a Router mechanism no .use because we 
// are just using the Router function

router.get('/', (req, res)=>{ // Over here so that it can search this first
    res.send("<h1>Welcome Home</h1>")
});

router.get('/about', (req, res)=>{

    res.send(`
                <h1>About Page</h1>
                <p>${req.query.section}</p>
                <p>${req.query.year}</p>
                <p>${req.query.industry}</p>
    `)

});

router.get('/contact', (req, res)=>{
    res.send("<h1>Contact Page</h1>")
});

router.get('/blog/:page', (req, res)=>{
    const page = req.params.page;
    res.send("<h1>Welcome to " + page + "</h1>")
});

router.get('*', (req, res)=>{  //We moved it to the end so that they search for this 
    // when they are done at the top
    res.send('<h1>Error404!</h1>')
});

module.exports = router;