const mongoose = require("mongoose");
const { Schema } = mongoose;

const User = require("./User");
const Seance = require("./Seance");

const reservationSchema = new Schema({
  client: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  seance: {
    type: Schema.Types.ObjectId,
    ref: "Seance",
    required: true,
  },
  statut: {
    type: String,
    enum: ["Confirme", "Annule"],
    default: "Confirme",
  },
  sieges: [
    {
      numero: {
        type: Number,
        required: true,
      },
      etat: {
        type: Boolean,
        default: false, // false hiya dispo & true hiya reserved
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
  archived_reservation: {
    type: Boolean,
    default: false,
  },
});

const reservationModel = mongoose.model("reservations", reservationSchema);

module.exports = reservationModel;
