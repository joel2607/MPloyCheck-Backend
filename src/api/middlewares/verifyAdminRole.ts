import { Request, NextFunction, Response } from 'express';
import { ErrorUnauthorized } from '../../helpers/errors';
import { JwtPayload } from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user: JwtPayload;
}

export const verifyAdminRole = (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {

    if (req.user.role !== 'admin') {
      return next(new ErrorUnauthorized('Admin access required'));
    }

    next();
};