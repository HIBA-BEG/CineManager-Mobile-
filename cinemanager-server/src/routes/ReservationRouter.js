const express = require("express");
const ReservationController = require("../controllers/ReservationController");
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);
router.get('/AvailaibleSeats/:id', ReservationController.getAvailableSeats);

router.get('/One/:id', ReservationController.getReservationById);
router.put('/:id', ReservationController.updateReservation);
router.post('/AddReservation', ReservationController.createReservation);
router.get('/MyReservations', ReservationController.getUserReservations);


router.delete('/:id', ReservationController.annulerReservation);


router.use(isAdmin);

router.get('/AllReservations', ReservationController.getAllReservations);
// router.get('/seance/:seanceId', ReservationController.getReservationsBySeance);

// router.put('/UpdateReservation/:id',ReservationController.);


module.exports = router;