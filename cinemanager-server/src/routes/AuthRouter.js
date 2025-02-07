const express = require("express");
// const { register, login } = require("../controllers/authController");
const UserController = require("../controllers/UserController");
const upload = require("../middleware/upload"); 
const router = express.Router();


router.post("/register", upload, UserController.register);
router.post("/login", UserController.login);

// router.get("/users", UserController.getUsers);
// router.get("/users/:id", UserController.getUser);
// router.put("/users/:id", UserController.updateUser);
// router.delete("/users/:id", UserController.deleteUser);

module.exports = router;