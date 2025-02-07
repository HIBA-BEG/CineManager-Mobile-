const { default: mongoose } = require('mongoose');
const { ratingModel } = require('../models/ModelsExports');

class RatingDao {
  async findAll() {
    try {
      return await ratingModel.find().populate('user film');
    } catch (error) {
      throw new Error('Error fetching Ratings');
    }
  }

  async findById(id) {
    try {
      return await ratingModel.findById(id).populate('user film');
    } catch (error) {
      throw new Error('Error finding Rating');
    }
  }

  async create(ratingData) {
    try {
      const newRating = new ratingModel(ratingData);
      return await newRating.save();
    } catch (error) {
      throw new Error('Error creating Rating');
    }
  }

  async updateById(id, updateData) {
    try {
      return await ratingModel.findByIdAndUpdate(id, updateData, { new: true }).populate('user film');
    } catch (error) {
      throw new Error('Error updating Rating');
    }
  }

  async deleteById(id) {
    try {
      return await ratingModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error('Error deleting Rating');
    }
  }

  async findByFilm(filmId) {
    try {
      return await ratingModel.find({ film: filmId }).populate('user');
    } catch (error) {
      throw new Error('Error fetching Ratings by film');
    }
  }

  async findByUser(userId) {
    try {
      return await ratingModel.find({ user: userId }).populate('film');
    } catch (error) {
      throw new Error('Error fetching Ratings by user');
    }
  }

  async getAverageRatingForFilm(filmId) {
    try {
      // console.log('film:', filmId);
      
      if (!mongoose.Types.ObjectId.isValid(filmId)) {
        throw new Error('Invalid film ID');
      }

      const result = await ratingModel.aggregate([
        { $match: { film: new mongoose.Types.ObjectId(filmId) } },
        { $group: { _id: null, averageRating: { $avg: "$score" } } }
      ]);
      // console.log("daoresult:",result);
      
      return result.length > 0 ? result[0].averageRating : 0;
    } catch (error) {
      // console.error('Error:', error);
      throw new Error('Error calculating average rating for film');
    }
  }

  async findUserRatingForFilm(userId, filmId) {
    try {
      return await ratingModel.findOne({ user: userId, film: filmId }).populate('film');
    } catch (error) {
      throw new Error('Error fetching user rating for film');
    }
  }
}

module.exports = new RatingDao();
