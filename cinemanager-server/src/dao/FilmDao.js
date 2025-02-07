const { filmModel } = require("../models/ModelsExports");

const minioClient = require("../../minio");

const fs = require("fs");

class filmDao {
  async findAll() {
    try {
      return await filmModel.find({ archived_film: false }).populate("genre");
    } catch (error) {
      throw new Error("Error fetching Films" + error.message);
    }
  }

  async findById(id) {
    try {
      return await filmModel.findById(id).populate("genre");
    } catch (error) {
      throw new Error("Error finding Film" + error.message);
    }
  }

  async uploadToMinioTrailer(file) {
    return new Promise((resolve, reject) => {
      const fileStream = fs.createReadStream(file.path);
      const fileName = Date.now() + "-" + file.originalname;

      minioClient.putObject(
        process.env.MINIO_BUCKET_TRAILER,
        fileName,
        fileStream,
        (err, etag) => {
          if (err) {
            console.error("Error uploading to MinIO:", err);
            return reject(err);
          }
          resolve(`/${process.env.MINIO_BUCKET_TRAILER}/${fileName}`);
        }
      );
    });
  }
  async uploadToMinioFilm(file) {
    return new Promise((resolve, reject) => {
      const fileStream = fs.createReadStream(file.path);
      const fileName = Date.now() + "-" + file.originalname;

      minioClient.putObject(
        process.env.MINIO_BUCKET_FILM,
        fileName,
        fileStream,
        (err, etag) => {
          if (err) {
            console.error("Error uploading to MinIO:", err);
            return reject(err);
          }
          resolve(`/${process.env.MINIO_BUCKET_FILM}/${fileName}`);
        }
      );
    });
  }
  async uploadToMinioAffiche(file) {
    return new Promise((resolve, reject) => {
      const fileStream = fs.createReadStream(file.path);
      const fileName = Date.now() + "-" + file.originalname;

      minioClient.putObject(
        process.env.MINIO_BUCKET_AFFICHE,
        fileName,
        fileStream,
        (err, etag) => {
          if (err) {
            console.error("Error uploading to MinIO:", err);
            return reject(err);
          }
          resolve(`/${process.env.MINIO_BUCKET_AFFICHE}/${fileName}`);
        }
      );
    });
  }

  async create(FilmData) {
    // console.log("dao: ", FilmData);
    try {
      const newFilm = new filmModel(FilmData);
      return await newFilm.save();
    } catch (error) {
      throw new Error("Error creating Film" + error.message);
    }
  }

  async updateById(id, updateData) {
    try {
      return await filmModel
        .findByIdAndUpdate(id, updateData, { new: true })
        .populate("genre");
    } catch (error) {
      throw new Error("Error updating Film" + error.message);
    }
  }

  async deleteById(id) {
    try {
      return await filmModel.findByIdAndUpdate(
        id,
        { archived_film: true },
        { new: true }
      );
    } catch (error) {
      throw new Error("Error deleting Film" + error.message);
    }
  }

  async findByGenre(genreId) {
    try {
      return await filmModel
        .find({ genre: genreId, archived_film: false })
        .populate("genre");
    } catch (error) {
      throw new Error("Error fetching Films by genre" + error.message);
    }
  }

  async getLatestFilms(limit = 10) {
    try {
      return await filmModel
        .find({ archived_film: false })
        .sort({ dateSortie: -1 })
        .limit(limit);
    } catch (error) {
      throw new Error("Error fetching latest Films" + error.message);
    }
  }

  async updateStreamingStatus(id, isStreamed, releaseStreamDate) {
    try {
      return await filmModel.findByIdAndUpdate(
        id,
        { isStreamed, releaseStreamDate },
        { new: true }
      );
    } catch (error) {
      throw new Error("Error updating Film streaming status" + error.message);
    }
  }

  async getRelatedFilms(filmId, limit = 5) {
    try {
      const film = await filmModel.findById(filmId);
      if (!film) throw new Error("Film not found");

      return await filmModel
        .find({
          $or: [
            { genre: film.genre },
            { titre: { $regex: film.titre, $options: "i" } },
            { dateSortie: { $gte: film.dateSortie, $lte: new Date() } },
          ],
          _id: { $ne: filmId },
          archived_film: false,
        })
        .limit(limit)
        .populate("genre");
    } catch (error) {
      throw new Error("Error fetching related Films" + error.message);
    }
  }
}

module.exports = new filmDao();
