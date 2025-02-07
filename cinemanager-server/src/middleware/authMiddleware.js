const jwt = require('jsonwebtoken');
const { userModel } = require('../models/ModelsExports');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "RESTFULAPIs");
    const user = await userModel.findOne({ _id: decoded._id, 'archived_user': false });

    // console.log('hilo'); 
    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.type === "Administrateur") {
    next();
  } else {
    res.status(403).send({ error: 'Access denied. Administrators only.' });
  }
};

module.exports = { authMiddleware, isAdmin };