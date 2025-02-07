const express = require('express');
const GenreController = require('../controllers/GenreController');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/AllGenres', GenreController.getAllGenres);
router.get('/One/:id', GenreController.getGenre);

router.use(authMiddleware);
router.use(isAdmin);

router.post('/AddGenre', GenreController.createGenre);
router.put('/UpdateGenre/:id', GenreController.updateGenre);
router.delete('/DeleteGenre/:id', GenreController.deleteGenre);

module.exports = router;