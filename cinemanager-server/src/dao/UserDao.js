const { userModel } = require("../models/ModelsExports");
const bcrypt = require("bcrypt");
const minioClient = require("../../minio");

const fs = require("fs");


class UserDao {
  async findAll() {
    try {
      return await userModel.find();
    } catch (error) {
      throw new Error("Error fetching Users");
    }
  }

  async findById(id) {
    try {
      return await userModel.findById(id);
    } catch (error) {
      throw new Error("Error finding User");
    }
  }

  async findByEmail(email) {
    try {
      return await userModel.findOne({ email });
    } catch (error) {
      throw new Error("Error finding User by email");
    }
  }

  async create(userData) {
    try {
      const newUser = new userModel(userData);
      newUser.hash_password = bcrypt.hashSync(userData.password, 10);
  const user = await newUser.save();
  console.log()
      return user
    } catch (error) {
      throw new Error("Error creating User");
    }
  }

  async uploadToMinioProfilePic(file) {
    return new Promise((resolve, reject) => {
      const fileStream = fs.createReadStream(file.path);
      const fileName = Date.now() + "-" + file.originalname;

      minioClient.putObject(
        process.env.MINIO_BUCKET_PROFILEPIC,
        fileName,
        fileStream,
        (err, etag) => {
          if (err) {
            console.error("Error uploading to MinIO:", err);
            return reject(err);
          }
          resolve(`/${process.env.MINIO_BUCKET_PROFILEPIC}/${fileName}`
          );
        }
      );
    });
  }

  async updateById(id, updateData) {
    try {
      if (updateData.password) {
        updateData.hash_password = bcrypt.hashSync(updateData.password, 10);
        delete updateData.password;
      }
      return await userModel.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
      throw new Error("Error updating User");
    }
  }


  async updateProfile(id, updateData) {
    try {
      if (updateData.password) {
        updateData.hash_password = bcrypt.hashSync(updateData.password, 10);
        delete updateData.password;
      }
      return await userModel.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
      throw new Error("Error updating User profile");
    }
  }

  async updateSubscription(id, subscriptionType) {
    try {
      return await userModel.findByIdAndUpdate(
        id,
        { abonnement: subscriptionType },
        { new: true }
      );
    } catch (error) {
      throw new Error("Error updating User subscription");
    }
  }

  async banUser(id) {
    try {
      return await userModel.findByIdAndUpdate(
        id,
        { archived_user: true },
        { new: true }
      );
    } catch (error) {
      throw new Error("Error banning User");
    }
  }

  async unBanUser(id) {
    try {
      return await userModel.findByIdAndUpdate(
        id,
        { archived_user: false },
        { new: true }
      );
    } catch (error) {
      throw new Error("Error activating User");
    }
  }

  async getProfile(id) {
    try {
      return await userModel.findById(id).select('-hash_password');
    } catch (error) {
      throw new Error("Error fetching User profile");
    }
  }
}

module.exports = new UserDao();
