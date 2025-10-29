import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';
const ACCESS_EXPIRES = '15m';
const REFRESH_EXPIRES = '7d';
const BCRYPT_ROUNDS = Number(process.env.BCRYPT_ROUNDS) || 10;

export async function hashPassword(plain: string) {
  return bcrypt.hash(plain, BCRYPT_ROUNDS);
}
export async function comparePassword(plain: string, hash: string) {
  return bcrypt.compare(plain, hash);
}

export function signAccessToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_EXPIRES });
}
export function signRefreshToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: REFRESH_EXPIRES });
}
export function verifyToken<T = any>(token: string) {
  return jwt.verify(token, JWT_SECRET) as T;
}
