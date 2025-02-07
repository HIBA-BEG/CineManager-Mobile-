const ReservationDao = require("../dao/ReservationDao");
const SeanceDao = require("../dao/SeanceDao");
const EmailSender = require('./EmailSender');

class ReservationController {
  async getAllReservations(req, res) {
    try {
      const reservations = await ReservationDao.getAllReservations();
      res.status(200).json(reservations);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }


  async createReservation(req, res) {
    const { seance, sieges } = req.body;

    if (!seance || !sieges) {
      return res
        .status(400)
        .json({ message: "Seance ID and seat numbers are required" });
    }

    try {
      const seanceData = await SeanceDao.findById(seance);
      if (!seanceData) {
        return res.status(404).json({ message: "Seance not found" });
      }


      const existingReservations = await ReservationDao.getReservationsBySeance(seance);
      const reservedSeats = new Set(existingReservations.flatMap(r => r.sieges.map(s => s.numero)));

      const unavailableSeats = sieges.filter(seatNumber => 
        reservedSeats.has(seatNumber) || seatNumber > seanceData.salle.capacite
      );
      

      if (unavailableSeats.length > 0) {
        return res.status(400).json({
          message: `The following seats are not available: ${unavailableSeats.join(
            ", "
          )}. Please choose different seats.`,
        });
      }

      const reservation = await ReservationDao.create({
        client: req.user._id,
        seance,
        sieges: sieges.map(numero => ({ numero, etat: true })),
        statut: "Confirme"
      });

      await EmailSender.sendConfirmationEmail(req.user.email, reservation);

      res.status(201).json(reservation);
    } catch (error) {
      console.error("Error creating reservation:", error.message);
      res.status(400).json({ message: error.message });
    }
  }


  async getAvailableSeats(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Seance ID is required" });
    }

    try {
      const seance = await SeanceDao.findById(id);
      console.log(seance);
      if (!seance) {
        return res.status(404).json({ message: 'Seance not found' });
      }

      const reservations = await ReservationDao.getReservationsBySeance(id);
      const totalSeats = seance.salle.capacite;
      const reservedSeats = new Set(reservations.flatMap(r => r.sieges.map(s => s.numero)));
      
      const availableSeats = [];
      for (let i = 1; i <= totalSeats; i++) {
        if (!reservedSeats.has(i)) {
          availableSeats.push(i);
        }
      }
      
      res.status(200).json({ 
        availableSeats,
        totalSeats,
        reservedSeats: Array.from(reservedSeats),
        availableSeatsCount: availableSeats.length
      });
      } catch (error) {
      console.error("Error fetching available seats:", error.message);
      res.status(400).json({ message: error.message });
    }
  }

  async getReservationById(req, res) {
    try {
      const reservation = await ReservationDao.findById(req.params.id);
      if (!reservation) {
        return res.status(404).json({ message: "Reservation not found" });
      }
      res.status(200).json(reservation);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateReservation(req, res) {
    try {
      const updatedReservation = await ReservationDao.updateReservation(req.params.id, req.body);
      if (!updatedReservation) {
        return res.status(404).json({ message: "Reservation not found" });
      }
      res.status(200).json(updatedReservation);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async annulerReservation(req, res) {
    try {
      const ReservationAnnule = await ReservationDao.annulerReservation(req.params.id);
      if (!ReservationAnnule) {
        return res.status(404).json({ message: "Reservation not found" });
      }
      res.status(200).json({ message: "Reservation annulé successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getUserReservations(req, res) {
    try {
      const reservations = await ReservationDao.getReservationsByUser(req.user._id);
      res.status(200).json(reservations);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // async getReservationsBySeance(req, res) {
  //   try {
  //     const seanceId = req.params.seanceId;
  //     console.log("Searching for reservations with seanceId:", seanceId);
  //     const reservations = await ReservationDao.getReservationsBySeance(seanceId);
  //     console.log("Found reservations:", JSON.stringify(reservations, null, 2));
  //     res.status(200).json(reservations);
  //   } catch (error) {
  //     console.error("Error in getReservationsBySeance:", error);
  //     res.status(500).json({ message: error.message });
  //   }
  // }
}

module.exports = new ReservationController();
