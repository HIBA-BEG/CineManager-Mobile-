const { Schema, default: mongoose } = require("mongoose");
const Film = require("./Film");
const Salle = require("./Salle");
const User = require("./User");

const seanceSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  film: {
    type: Schema.Types.ObjectId,
    ref: "Film",
    required: true,
  },
  salle: {
    type: Schema.Types.ObjectId,
    ref: "Salle",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  heure_debut: {
    type: String, 
    required: true,
  },
  heure_fin: {
    type: String, 
    required: true,
  },
  tarif: {
    type: Number,
    required: true,
  },
  placesDisponibles: {
    type: Number,
    required: true,
  },
  archived_seance: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const seanceModel = mongoose.model("seances", seanceSchema);

module.exports = seanceModel;
