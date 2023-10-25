import jwt from 'jsonwebtoken';

const authToken = (res, userId , role) => {
  const token = jwt.sign({ userId , role }, process.env.JWT_SECRET, {
    expiresIn: '15d',
  });

  return token;

  // res.cookie('jwt', token, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV !== 'development', 
  //   sameSite: 'strict', 
  //   maxAge: 30 * 24 * 60 * 60 * 1000, 
  // });
};

export default authToken;