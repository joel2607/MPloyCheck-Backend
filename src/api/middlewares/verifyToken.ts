import { Request, NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ErrorUnauthorized, ErrorNotFound } from '../../helpers/errors';
import User from '../../models/user';
import { JwtPayload } from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

// Middleware to verify JWT and check for admin role
const verifyToken = async (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
  try {
    // Get the authorization header
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
    
    // Verify the token
    // Note: JWT_SECRET should be stored in environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    
    // Store the decoded user in the request object for use in subsequent middleware or route handlers
    req.user = decoded;
    
    // This is where you would typically call the database to verify the user still exists
    // and has valid permissions. For example:
    // 
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new ErrorNotFound('User no longer exists in the system');
    }
    
    if (decoded.role !== 'admin') {
      throw new ErrorUnauthorized('Access denied: Admin role required');
    }
    
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new ErrorUnauthorized('Invalid token'));
    } else if (error instanceof jwt.TokenExpiredError) {
      next(new ErrorUnauthorized('Token has expired'));
    } else {
      next(error);
    }
  }
};

export default verifyToken;
