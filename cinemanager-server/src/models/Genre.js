const { Schema, default: mongoose } = require("mongoose");

const genreSchema = new Schema({
    nom: { 
        type: String, 
        unique: true, 
        required: true 
    },
    description: {
        type: String
    },
    archived_genre: {
        type: Boolean,
        default: false,
      },
  },
);

const Genre = mongoose.model("Genre", genreSchema);

module.exports = Genre;
