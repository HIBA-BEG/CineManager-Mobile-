const GenreDao = require('../dao/GenreDao');

class GenreController {
  async getAllGenres(req, res) {
    try {
      const genres = await GenreDao.findAll();
      res.status(200).json(genres);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getGenre(req, res) {
    try {
      const genre = await GenreDao.findById(req.params.id);
      if (!genre) {
        return res.status(404).json({ message: 'Genre not found' });
      }
      res.status(200).json(genre);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createGenre(req, res) {
    try {
      const newGenre = await GenreDao.create(req.body);
      res.status(201).json(newGenre);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateGenre(req, res) {
    try {
      const updatedGenre = await GenreDao.updateById(req.params.id, req.body);
      if (!updatedGenre) {
        return res.status(404).json({ message: 'Genre not found' });
      }
      res.status(200).json(updatedGenre);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteGenre(req, res) {
    try {
      const deletedGenre = await GenreDao.deleteById(req.params.id);
      if (!deletedGenre) {
        return res.status(404).json({ message: 'Genre not found' });
      }
      res.status(200).json({ message: 'Genre deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new GenreController();