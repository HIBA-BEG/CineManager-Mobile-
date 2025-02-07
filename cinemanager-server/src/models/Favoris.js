const { Schema, default:mongoose } = require("mongoose");

const favorisSchema = new Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    film: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Film' 
    },
}, { timestamps: true });

const Favoris = mongoose.model('Favoris', favorisSchema);
module.exports = Favoris;