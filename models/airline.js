const mongoose = require('mongoose'), Schema = mongoose.Schema;

var Comment = new Schema({
    body: String
    , date: { type: Date, default: Date.now }
    , userEmail : String
});

var StarRating = new Schema({
    rating: Number,
    date: { type: Date, default: Date.now },
    userEmail : String
})

const AirlineSchema = mongoose.Schema({
    name: String,
    comments: [Comment],
    imagePath : String,
    starRatings : [StarRating],
    starsCount: { type: Number, default: 0 }
});

module.exports = mongoose.model('airline', AirlineSchema);