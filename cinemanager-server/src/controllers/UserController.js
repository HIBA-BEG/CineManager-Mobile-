const jwt = require("jsonwebtoken");
const UserDao = require("../dao/UserDao");

class UserController {
  
  async register(req, res) {
    try {
      const { email, password, nom, prenom, type, numero_telephone, adresse, birthday, abonnement } = req.body;
      // console.log(req.body)
      let profilePicUrl = null;
      
      if (req.files && req.files.profilePic) {
        const profilePicFile = req.files.profilePic[0];
        // console.log('Profile Pictwure Upload:', profilePicFile);
        profilePicUrl = await UserDao.uploadToMinioProfilePic(profilePicFile);
    }
    console.log(profilePicUrl)

    const newUser = await UserDao.create({
      email,
      password,
      nom,
      prenom,
      type,
      numero_telephone,
      adresse,
      birthday,
      abonnement,
      profilePic: profilePicUrl,
    });
    
 
      // const newUser = await UserDao.create(req.body);
      newUser.hash_password = undefined;
      return res.status(201).json(newUser);
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
  }

  login(req, res) {
    UserDao.findByEmail(req.body.email)
      .then((user) => {
        if (!user || !user.comparePassword(req.body.password)) {
          return res
            .status(401)
            .json({
              message: "Authentication failed. Invalid user or password.",
            });
        }

        const token = jwt.sign(
          {
            email: user.email,
            nom: user.nom,
            prenom: user.prenom,
            _id: user._id,
          },
          process.env.JWT_SECRET || "RESTFULAPIs"
          // { expiresIn: "1h" }
        );

        return res.json({
          token,
          user: {
            id: user._id,
            email: user.email,
            nom: user.nom,
            prenom: user.prenom,
            type: user.type,
            abonnement: user.abonnement,
            profilePic: user.profilePic,	
            archived_user: user.archived_user,
          },
        });
      })

      .catch((err) => {
        console.error(err.message);
        return res.status(500).json({ message: "Internal server error" });
      });
  }

  async getUsers(req, res) {
    try {
      const users = await UserDao.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getUser(req, res) {
    try {
      const user = await UserDao.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // async getCities(req, res){
  //   try {
  //     const users = await UserDao.findAll();
  //     const cities = users.map( user => user.city )
  //     const uniqueCities = []
  //     for (let city of cities) {
  //       if (!uniqueCities.includes(city)) {
  //         uniqueCities.push(city)
  //       }
  //     }    
  //      res.json(uniqueCities)
  //   } catch (error) {
  //     res.json({ message: error.message });
  //   }
  // }

  async updateUser(req, res) {
    try {
      const updatedUser = await UserDao.updateById(req.params.id, req.body);
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      updatedUser.hash_password = undefined;
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const deletedUser = await UserDao.deleteById(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateProfile(req, res) {
    try {
      const updatedUser = await UserDao.updateProfile(req.params.id, req.body);
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      updatedUser.hash_password = undefined;
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateSubscription(req, res) {
    try {
      const { abonnement } = req.body;
      if (!['Subscribed', 'Basic'].includes(abonnement)) {
        return res.status(400).json({ message: "Invalid subscription type" });
      }
      const updatedUser = await UserDao.updateSubscription(
        req.params.id,
        abonnement
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      updatedUser.hash_password = undefined;
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async banUser(req, res) {
    try {
      const bannedUser = await UserDao.banUser(req.params.id);
      if (!bannedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User banned successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async unBanUser(req, res) {
    try {
      const unbannedUser = await UserDao.unBanUser(req.params.id);
      if (!unbannedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User activated successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getProfile(req, res) {
    try {
      const userId = req.user.id;
      const user = await UserDao.getProfile(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateMyProfile(req, res) {
    try {
      const userId = req.user.id;
      const updatedUser = await UserDao.updateProfile(userId, req.body);
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      updatedUser.hash_password = undefined;
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteMyAccount(req, res) {
    try {
      const userId = req.user.id;
      const archivedUser = await UserDao.banUser(userId);
      if (!archivedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User profile deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new UserController();
