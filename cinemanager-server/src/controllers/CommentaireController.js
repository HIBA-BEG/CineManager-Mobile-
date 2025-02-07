const CommentaireDao = require('../dao/CommentaireDao');
const FilmDao = require('../dao/FilmDao');

class CommentaireController {
  async createCommentaire(req, res) {
    // console.log('Received request body:', req.body);
    try {
        const { contenu, film } = req.body;
        const userId = req.user._id;

        console.log('Looking for film with ID:', film);
        const filmDoc = await FilmDao.findById(film);
        if (!filmDoc) {
            // console.log('Film not found with ID:', film);
            return res.status(404).json({ message: 'Film not found' });
        }

        console.log('Film found, creating comment');
        const newCommentaire = await CommentaireDao.create({
            contenu,
            user: userId,
            film: film,
        });

        // console.log('New comment created:', newCommentaire);
        res.status(201).json(newCommentaire);
    } catch (error) {
        // console.error('Error in createCommentaire:', error);
        res.status(400).json({ message: error.message });
    }
}

  async getCommentairesByFilm(req, res) {
    try {
      const { filmId } = req.params;
      const commentaires = await CommentaireDao.findByFilm(filmId);
      res.status(200).json(commentaires);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateCommentaire(req, res) {
    try {
      const { id } = req.params;
      const { contenu } = req.body;
      const userId = req.user._id;

      const commentaire = await CommentaireDao.findById(id);
      if (!commentaire || commentaire.archived_comment) {
        return res.status(404).json({ message: 'Commentaire not found' });
      }

      if (commentaire.user.toString() !== userId.toString()) {
        return res.status(403).json({ message: 'Not authorized to update this commentaire' });
      }

      const updatedCommentaire = await CommentaireDao.update(id, { contenu });
      res.status(200).json(updatedCommentaire);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteCommentaire(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user._id;

      const commentaire = await CommentaireDao.findById(id);
      if (!commentaire || commentaire.archived_comment) {
        return res.status(404).json({ message: 'Commentaire not found' });
      }

      if (commentaire.user.toString() !== userId.toString()) {
        return res.status(403).json({ message: 'Not authorized to deleted this commentaire' });
      }

      await CommentaireDao.deleteById(id);
      res.status(200).json({ message: 'Commentaire deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new CommentaireController();