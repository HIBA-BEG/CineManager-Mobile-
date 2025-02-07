const FavorisDao = require("../dao/FavorisDao");

class FavorisController {
  async getAllFavoris(req, res) {
    try {
      const favoris = await FavorisDao.findAll();
      res.status(200).json(favoris);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getFavoris(req, res) {
    try {
      const favoris = await FavorisDao.findById(req.params.id);
      if (!favoris) {
        return res.status(404).json({ message: "Favoris not found" });
      }
      res.status(200).json(favoris);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createFavoris(req, res) {
    try {
      const {film} = req.body;
      const newFavoris = await FavorisDao.create({ user: req.user.id, film });
      res.status(201).json(newFavoris);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteFavoris(req, res) {
    try {
      const filmId = req.params.filmId;
      const deletedFavoris = await FavorisDao.deleteById(filmId);
      if (!deletedFavoris) {
        return res.status(404).json({ message: "Favoris not found" });
      }
      res.status(200).json({ message: "Favoris deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getFavorisByUser(req, res) {
    try {
      const favoris = await FavorisDao.findByUser(req.user.id);
      // console.log("favoris", favoris);
      res.status(200).json(favoris);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async checkFavorite(req, res) {
    try {
      const filmId = req.params.filmId;
      const userId = req.user.id;
      const isFavorite = await FavorisDao.isFavorite(userId, filmId);
      res.status(200).json({ isFavorite });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new FavorisController();
