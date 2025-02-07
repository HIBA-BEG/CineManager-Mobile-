const { Schema, default:mongoose } = require("mongoose");

const ratingSchema = new Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    film: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Film' 
    },
    score: { 
        type: Number, 
        min: 1, 
        max: 5 
    },
}, { timestamps: true });

const Rating = mongoose.model('Rating', ratingSchema);
module.exports = Rating;
