const { Schema, default: mongoose } = require("mongoose");

const salleSchema = new Schema({
  nom: {
    type: String,
    required: true,
  },
  capacite: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },

  archived_salle: {
    type: Boolean,
    default: false,
  },
});

const salleModel = mongoose.model("Salle", salleSchema);

module.exports = salleModel;
