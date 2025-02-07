const { favorisModel } = require('../models/ModelsExports');

class FavorisDao {
  async create(favorisData) {
    try {
      const newFavoris = new favorisModel(favorisData);
      return await newFavoris.save();
    } catch (error) {
      throw new Error('Error creating Favoris' + error.message);
    }
  }

  async findByUser(userId) {
    try {
      return await favorisModel.find({ user: userId }).populate('film');
    } catch (error) {
      throw new Error('Error fetching Favoris for User' + error.message);
    }
  }

  async deleteById(filmId) {
    try {
      return await favorisModel.findOneAndDelete(filmId);
    } catch (error) {
      throw new Error('Error deleting Favoris' + error.message);
    }
  }

  async isFavorite(userId, filmId) {
    try {
      const favorite = await favorisModel.findOne({ user: userId, film: filmId });
      return !!favorite;
    } catch (error) {
      throw new Error('Error checking if Film is favorite' + error.message);
    }
  }
}

module.exports = new FavorisDao();