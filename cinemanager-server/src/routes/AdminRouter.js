const express = require('express');
const AdminController = require('../controllers/AdminController');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware);
router.use(isAdmin);

router.get('/AllAdmins', AdminController.getAllAdmins);
router.get('/One/:id', AdminController.getAdmin);
router.post('/AddAdmin', AdminController.createAdmin);
router.put('/UpdateAdmin/:id', AdminController.updateAdmin);
router.delete('/DeleteAdmin/:id', AdminController.deleteAdmin);
router.get('/Statistics', AdminController.getStatistics);

module.exports = router;