import api from '@/services/api';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { LOGIN } from './pageUrl';
import cogotoast from '@/components/toaster';
import { useQueryClient } from "react-query";

const JWT_SECRET: string = process.env.JWT_SECRET!;
// const queryClient = useQueryClient()

export async function comparePasswords(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword);
}

export function generateToken(userId: string) {
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
  return token;
}

export const logOutAction = () => {
  // localStorage.removeItem('jwtToken');
  // logOut()
  sessionStorage.clear();
  delete api.defaults.headers.Authorization;
  delete api.defaults.headers.auth_key;
  window.location.href = LOGIN;
  cogotoast("Logged out successfully", "success");
};
