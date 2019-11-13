//Import mongoose
const mongoose = require('mongoose');

// Assign the Schema object
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    companyName: {
        type: String
    },
    employees: {
        type: String,
        required: true
        
    },
    location: {
        type: String
    },

    website:{
        type: String
    },

    contact: {
        type: String,
       
    },

    logo: {
        type: String,
        
    },
     
    date: {
        type: Date,
        default: Date.now
    }


});

const CompanyModel = mongoose.model('company', CompanySchema);
module.exports = CompanyModel;
