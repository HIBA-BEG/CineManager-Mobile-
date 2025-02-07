const express = require('express');
const RatingController = require('../controllers/RatingController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/film/:filmId', RatingController.getRatingsByFilm);
router.get('/average/:filmId', RatingController.getAverageRatingForFilm);

router.use(authMiddleware);

router.get('/AllRatings', RatingController.getAllRatings);
router.get('/One/:id', RatingController.getRating);
router.post('/AddRating', RatingController.createRating);
router.put('/UpdateRating/:id', RatingController.updateRating);
router.delete('/DeleteRating/:id', RatingController.deleteRating);
router.get('/user/:userId', RatingController.getRatingsByUser);
router.get('/MyRating/:filmId', RatingController.getUserRatingForFilm);

module.exports = router;
