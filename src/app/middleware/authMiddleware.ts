import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import { keys } from './../../variables';
import { MESSAGES } from '../../utils/constants';
import TokenPayload from '../../interfaces/TokenPayload';

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send(MESSAGES.LOGIN_FAILED);
  }

  const token: string = authorization.replace('Bearer', '').trim();
  try {
    const data: any = jwt.verify(token, keys.TOKEN_KEY.toString());

    const { id } = data as TokenPayload;

    req.userId = id;

    return next();
  } catch {
    return res.status(401).send(MESSAGES.LOGIN_FAILED);
  }
}
