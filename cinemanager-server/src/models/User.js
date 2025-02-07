const { Schema, default: mongoose } = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  hash_password: {
    type: String,
    required: true,
  },
  archived_user: {
    type: Boolean,
    default: false,
  },
  city: {
    type: String,
    default: 'Casablanca',
  },
  type: {
    type: String,
    enum: ["Client", "Administrateur"],
    default: "Client",
    required: true,
  },
  numero_telephone: {
    type: String,
    required: true,
  },
  adresse: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
  },
  profilePic: {
    type: String,
  },
  abonnement: {
    type: String,
    enum: ["Subscribed", "Basic"],
    default: "Basic",
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now
  }

});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.hash_password);
};
userSchema.methods.isSubscribed = function () {
  return this.abonnement === "Subscribed";
};
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;

