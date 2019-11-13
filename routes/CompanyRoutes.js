const express = require('express');
const router = express.Router();
const CompanyModel = require('../models/CompanyModel');

router.post('/company', (req, res)=>{
    const formData = {
        companyName: req.body.companyName,
        noOfEmployees: req.body.noOfEmployees,
        location: req.body.location,
        website: req.body.website,
        contact: req.body.contact,
        logo: req.body.logo
}

const newCompany = new CompanyModel(formData);

newCompany
    .save()
    .then(newFeedData=>{
        res.json(newFeedData);
    })
    .catch(err=>{
        res.json(err)
    });

});



module.exports = router;


