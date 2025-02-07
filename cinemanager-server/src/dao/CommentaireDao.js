const { commentaireModel } = require('../models/ModelsExports');

class CommentaireDao {
  async create(commentaireData) {
    try {
      const newCommentaire = new commentaireModel(commentaireData);
      return await newCommentaire.save();
    } catch (error) {
      throw new Error('Error creating Commentaire' + error.message);
    }
  }

  async findByFilm(filmId) {
    try {
      return await commentaireModel.find({ film: filmId }).populate('user');
    } catch (error) {
      throw new Error('Error fetching Commentaires for Film' + error.message);
    }
  }
 
  async findById(id) {
    try {
      return await commentaireModel.findById(id);
    } catch (error) {
      throw new Error("Error finding commentaire" + error.message);
    }
  }

  async update(id, updateData) {
    try {
      return await commentaireModel.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
      throw new Error('Error updating Commentaire' + error.message);
    }
  }

  async deleteById(id) {
    try {
      return await commentaireModel.findByIdAndDelete(id, { archived_comment: true }, { new: true });
    } catch (error) {
      throw new Error('Error deleting Commentaire' + error.message);
    }
  }
}


module.exports = new CommentaireDao();