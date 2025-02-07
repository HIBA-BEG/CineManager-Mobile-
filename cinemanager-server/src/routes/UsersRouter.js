const express = require("express");
const UserController = require("../controllers/UserController");
const AdminController = require('../controllers/AdminController');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

// router.get('/cities', UserController.getCities);
router.use(authMiddleware);

router.get("/MyProfile", UserController.getProfile);
router.put("/MyProfile", UserController.updateMyProfile);
router.delete("/MyProfile", UserController.deleteMyAccount);


router.use(isAdmin);

router.get("/AllUsers", UserController.getUsers);
// router.get('/', UserController.getUsers);
router.get('/One/:id', UserController.getUser);
router.put('/update/:id', UserController.updateUser);
router.put('/Profile/:id', UserController.updateProfile);
// router.delete('/:id', UserController.deleteUser);
router.put('/updateSubscription/:id', UserController.updateSubscription);
router.put('/ban/:id', UserController.banUser);
router.put('/unban/:id', UserController.unBanUser);


module.exports = router;