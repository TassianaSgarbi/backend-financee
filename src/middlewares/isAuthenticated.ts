import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Extend the global Express namespace to add user_id to the Request interface
declare global {
  namespace Express {
    interface Request {
      user_id?: string;
    }
  }
}

const jwtSecret = process.env.JWT_SECRET as string;

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized', message: 'Missing authorization header' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, jwtSecret) as { sub: string };
    req.user_id = decoded.sub;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: 'Unauthorized', message: 'Invalid token' });
  }
};