const { default: mongoose } = require("mongoose");
const { reservationModel, seanceModel } = require("../models/ModelsExports");

class ReservationDao {
  async create(reservationData) {
    try {
      const reservation = new reservationModel(reservationData);
      reservation.sieges.forEach((siege) => (siege.etat = true));
      return await reservation.save();
    } catch (error) {
      throw new Error("Error creating reservation: " + error.message);
    }
  }
  async getAllReservations() {
    try {
      return await reservationModel
        .find({ archived_reservation: false })
        .populate("client")
        .populate({
          path: "seance",
          model: mongoose.model("seances"),
        });
    } catch (error) {
      throw new Error("Error fetching reservations: " + error.message);
    }
  }

  async getReservationsBySeance(seanceId) {
    try {
      return await reservationModel
        .find({
          seance: seanceId,
          archived_reservation: false,
          statut: "Confirme",
        })
        .populate("client")
        .populate({
          path: "seance",
          model: mongoose.model("seances")
        });
    } catch (error) {
      throw new Error(
        "Error fetching reservations by seance: " + error.message
      );
    }
  }

  async findById(id) {
    try {
      return await reservationModel
        .findById(id)
        .populate("user")
        .populate({
          path: "seance",
          model: mongoose.model("seances"),
        });
    } catch (error) {
      throw new Error("Error fetching reservation: " + error.message);
    }
  }

  async updateReservation(id, updateData) {
    try {
      return await reservationModel.findByIdAndUpdate(id, updateData, {
        new: true,
      });
    } catch (error) {
      throw new Error("Error updating reservation: " + error.message);
    }
  }

  async annulerReservation(id) {
    try {
      return await reservationModel.findByIdAndUpdate(
        id,
        { archived_reservation: true },
        { new: true }
      );
    } catch (error) {
      throw new Error("Error deleting reservation: " + error.message);
    }
  }

  async getReservationsByUser(userId) {
    try {
      return await reservationModel
        .find({ client: userId, archived_reservation: false })
        .populate({
          path: "seance",
          model: seanceModel,
          populate: [
            {
              path: "salle",
              model: "Salle",
              select: "nom"
            },
            {
              path: "film",
              model: "Film",
              select: "affiche titre"
            }
          ]
        });
    } catch (error) {
      throw new Error("Error fetching user reservations: " + error.message);
    }
  }
}

module.exports = new ReservationDao();
