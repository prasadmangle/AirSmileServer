const mongoose = require('mongoose');

const LikeSchema = mongoose.Schema({
    airlineId : String,
    name: String
});

module.exports = mongoose.model('like', LikeSchema);