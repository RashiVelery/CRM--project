import jwt from 'jsonwebtoken';
import User from '../models/User.js';
// Protected Middleware ---
const protect = async (req, res, next) => {
  try {
    
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }
 
    // Verify the token ---
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.id;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalid" });
  }
};


export default protect;
