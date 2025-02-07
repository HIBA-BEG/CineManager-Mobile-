const { salleModel }  = require('../models/ModelsExports');

class SALLEdao {
    async findAll() {
        try {
            return await salleModel.find({ archived_salle: false });
        } catch (error) {
            throw new Error('Error fetching Salles');
        }
    }

    async findById(id) {
        try {
            return await salleModel.findById(id);
        } catch (error) {
            throw new Error('Error finding Salle');
        }
    }

    async create(salleData) {
        try {
            const newSalle = new salleModel(salleData);
            return await newSalle.save();
        } catch (error) {
            throw new Error('Error creating Salle');
        }
    }

    async updateById(id, updateData) {
        try {
            return await salleModel.findByIdAndUpdate(id, updateData, { new: true });
        } catch (error) {
            throw new Error('Error updating Salle');
        }
    }

    async deleteById(id) {
        try {
            return await salleModel.findByIdAndUpdate(id, { archived_salle: true }, { new: true });
        } catch (error) {
            throw new Error('Error deleting Salle');
        }
    }
}

module.exports = new SALLEdao();