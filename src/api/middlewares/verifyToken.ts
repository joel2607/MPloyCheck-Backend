import { Request, NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ErrorUnauthorized, ErrorNotFound } from '../../helpers/errors';
import User from '../../models/user';
import { JwtPayload } from 'jsonwebtoken';
import envHandler from '../../config/envHandler';

interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

// Middleware to verify JWT and check for admin role
const verifyToken = async (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    // Check if authorization header exists
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ErrorUnauthorized('Authorization header missing or invalid format');
    }
    
    // Extract the token
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      throw new ErrorUnauthorized('Token not provided');
    }
    
    const decoded = jwt.verify(token, envHandler["JWT_KEY"]) as JwtPayload;
    
    // Store the decoded user in the request object for use in subsequent middleware or route handlers
    req.user = decoded;
    

    const user = await User.findOne({ _id: decoded.userId });
    if (!user) {
      throw new ErrorNotFound('User no longer exists in the system');
    }
    
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new ErrorUnauthorized(`Invalid token: ${error.message}`));
    } else if (error instanceof jwt.TokenExpiredError) {
      next(new ErrorUnauthorized(`Token has expired: ${error.message}`));
    } else {
      next(error);
    }
  }
};

export default verifyToken;
