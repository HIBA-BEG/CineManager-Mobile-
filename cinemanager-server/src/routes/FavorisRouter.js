const express = require('express');
const FavorisController = require('../controllers/FavorisController');
const {authMiddleware} = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.post('/AddFavoris', FavorisController.createFavoris);
router.get('/MyFavorites', FavorisController.getFavorisByUser);
router.get('/CheckFavorite/:filmId', FavorisController.checkFavorite);
router.delete('/DeleteFavoris/:filmId', FavorisController.deleteFavoris);


module.exports = router;