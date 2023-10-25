import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const checkAuth = asyncHandler(async (req, res, next) => {
  let token;

  let authHeader = req.headers["authorization"];


  if (authHeader) {


    token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

const checkRole = (roles) => asyncHandler(async (req, res, next) => {
  let token;

  let authHeader = req.headers["authorization"];

  if (authHeader) {
    try {
      token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);

      roles.includes(user.role) ? next() : res.status(401).send('Unauthorized')
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }

})

export { checkAuth, checkRole };