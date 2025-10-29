import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../lib/auth';

export function requireAuth(
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies?.app_access;
    if (!token) return res.status(401).json({ error: 'Not authenticated' });
    const payload = verifyToken<{ userId: number }>(token);
    if (!payload?.userId)
      return res.status(401).json({ error: 'Invalid token' });
    req.user = { id: payload.userId };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
