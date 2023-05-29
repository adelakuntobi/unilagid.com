import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const JWT_SECRET: string = process.env.JWT_SECRET!;

// const { JWT_SECRET } = process.env;

// if (!JWT_SECRET) {
//   throw new Error('Please define the JWT_SECRET environment variable inside .env.local');
// }

export async function comparePasswords(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword);
}

export function generateToken(userId: string) {
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
  return token;
}