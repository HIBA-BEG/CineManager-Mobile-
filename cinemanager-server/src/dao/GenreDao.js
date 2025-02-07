const { genreModel } = require('../models/ModelsExports');

class GenreDao {
  async findAll() {
    try {
      return await genreModel.find();
    } catch (error) {
      throw new Error('Error fetching Genres');
    }
  }

  async findById(id) {
    try {
      return await genreModel.findById(id);
    } catch (error) {
      throw new Error('Error finding Genre');
    }
  }

  async create(genreData) {
    try {
      const newGenre = new genreModel(genreData);
      return await newGenre.save();
    } catch (error) {
      throw new Error('Error creating Genre');
    }
  }

  async updateById(id, updateData) {
    try {
      return await genreModel.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
      throw new Error('Error updating Genre');
    }
  }

  async deleteById(id) {
    try {
      return await genreModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error('Error deleting Genre');
    }
  }
}

module.exports = new GenreDao();