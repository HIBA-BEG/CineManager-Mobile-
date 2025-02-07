const SalleDao = require("../dao/SalleDao");

class SalleController {
  async getSalles(req, res) {
    try {
      const salles = await SalleDao.findAll();
      res.status(200).json(salles);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getSalle(req, res) {
    try {
      const salle = await SalleDao.findById(req.params.id);
      if (!salle) {
        return res.status(404).json({ message: "Salle not found" });
      }
      res.status(200).json(salle);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createSalle(req, res) {
      const { nom, capacite, type} = req.body;
    try {
      
      const newSalle = await SalleDao.create({
        nom,
        capacite,
        type,
      });
      res.status(201).json(newSalle);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateSalle(req, res) {
    try {
      const updatedSalle = await SalleDao.updateById(req.params.id, req.body);
      if (!updatedSalle) {
        return res.status(404).json({ message: "Salle not found" });
      }
      res.status(200).json(updatedSalle);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteSalle(req, res) {
    try {
      const deletedSalle = await SalleDao.deleteById(req.params.id);
      if (!deletedSalle) {
        return res.status(404).json({ message: "Salle not found" });
      }
      res.status(200).json({ message: "Salle deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new SalleController();
