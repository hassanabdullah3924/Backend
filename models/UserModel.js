//Import mongoose
const mongoose = require('mongoose');

// Assign the Schema object
const Schema = mongoose.Schema;

const UserSchema = new Schema({ //Schema is a structure for all the documents to go into
    firstName : {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true

    },
    password: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// a Model has a function like save, delete, encrypt etc

const UserModel = mongoose.model('user', UserSchema);
module.exports = UserModel;
