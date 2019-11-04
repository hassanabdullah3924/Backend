//Import mongoose
const mongoose = require('mongoose');

// Assign the Schema object
const Schema = mongoose.Schema;

const FeedSchema = new Schema({
    userName: {
        type: String
    },
    comment: {
        type: String,
        required: true
        
    },
    tags: {
        type: String,
        required: true
    },

    image:{
        type: String
    },

    likes: {
        type: Number,
        default: 0
    },

    shares: {
        type: Number,
        default: 0
    },
     
    date: {
        type: Date,
        default: Date.now
    }


})

module.exports = Feed = mongoose.model('feed', FeedSchema);
