const express = require('express');
const CommentaireController = require('../controllers/CommentaireController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/AllComments/:filmId', CommentaireController.getCommentairesByFilm);

router.use(authMiddleware);

router.post('/AddComment', CommentaireController.createCommentaire);
router.delete('/DeleteComment/:id', CommentaireController.deleteCommentaire);
router.put('/UpdateComment/:id', CommentaireController.updateCommentaire);

module.exports = router;