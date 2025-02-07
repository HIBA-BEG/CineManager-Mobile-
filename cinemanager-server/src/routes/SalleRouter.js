const express = require('express');
const SalleController = require('../controllers/SalleController');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/AllSalles', SalleController.getSalles);
router.get('/One/:id', SalleController.getSalle);

router.use(authMiddleware);
router.use(isAdmin);

router.post('/AddSalle', SalleController.createSalle);
router.put('/UpdateSalle/:id', SalleController.updateSalle);
router.delete('/DeleteSalle/:id', SalleController.deleteSalle);

module.exports = router;