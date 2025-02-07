const express = require('express');
const AuthRouter = require('./AuthRouter');
const SalleRouter = require('./SalleRouter');
const FilmRouter = require('./FilmRouter');
const AdminRouter = require('./AdminRouter');
const UserRouter = require('./UsersRouter');
const SeanceRouter = require('./SeanceRouter');
const ReservationRouter = require('./ReservationRouter');
const GenreRouter = require('./GenreRouter');
const CommentaireRouter = require('./CommentaireRouter');
const RatingRouter = require('./RatingRouter');
const FavorisRouter = require('./FavorisRouter');
const router = express.Router();


router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/', (req, res) => {
    res.send('Welcome to CinéManager!');
});


router.use('/api/auth', AuthRouter);
router.use('/api/admin', AdminRouter);
router.use('/api/users', UserRouter);
router.use('/api/films', FilmRouter);
router.use('/api/salles', SalleRouter);
router.use('/api/seances', SeanceRouter);
router.use('/api/reservations', ReservationRouter);
router.use('/api/genres', GenreRouter);
router.use('/api/commentaires', CommentaireRouter);
router.use('/api/ratings', RatingRouter);
router.use('/api/favoris', FavorisRouter);

module.exports = router;
