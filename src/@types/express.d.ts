// express.d.ts
import { Request, Response, NextFunction } from 'express';

// Estendendo o tipo Request para adicionar a propriedade user_id
declare global {
  namespace Express {
    interface Request {
      user_id?: string; // ou o tipo que você estiver usando
    }
  }
}
