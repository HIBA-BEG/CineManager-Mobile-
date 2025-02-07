const { Schema, default: mongoose } = require("mongoose");

const commentaireSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    film: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Film",
    },
    contenu: {
      type: String,
      required: true,
    },
    archived_comment: {
      type: Boolean,
      default: false,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const CommentaireModel = mongoose.model("Commentaire", commentaireSchema);

module.exports = CommentaireModel;
