const { userModel } = require("../models/ModelsExports");

class AdminDAO {
  async findAllAdmins() {
    try {
      return await userModel.find({
        type: "Administrateur",
        archived_user: false,
      });
    } catch (error) {
      throw new Error("Error fetching Administrateurs");
    }
  }

  async findAdminById(id) {
    try {
      return await userModel.findOne({
        _id: id,
        type: "Administrateur",
        archived_user: false,
      });
    } catch (error) {
      throw new Error("Error finding Administrateur");
    }
  }

async createAdmin(adminData) {
    try {
      const newAdmin = new userModel(adminData);
      return await newAdmin.save();
    } catch (error) {
      throw new Error('Error creating Administrateur: ' + error.message);
    }
  }

  async updateAdminById(id, updateData) {
    try {
      return await userModel.findOneAndUpdate(
        { _id: id, type: "Administrateur", archived_user: false },
        updateData,
        { new: true }
      );
    } catch (error) {
      throw new Error("Error updating Administrateur");
    }
  }

  async deleteAdminById(id) {
    try {
      return await userModel.findByIdAndUpdate(id,
        {type: "Administrateur"},
        { archived_user: true },
        { new: true }
      );
    } catch (error) {
      throw new Error("Error deleting Administrateur");
    }
  }
}

module.exports = new AdminDAO();
