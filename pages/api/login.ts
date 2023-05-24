import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

// User data for demonstration purposes
const users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    password: 'test_password', // Password: "password"
  },
];

// Generate a random secret key for JWT
const secretKey = crypto.randomBytes(32).toString('hex');

export default function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email, password } = req.body;

  // Find the user with the provided email
  const user = users.find((user) => user.email === email);
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  // Check if the provided password matches the stored hashed password
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  // Generate an access token
  const accessToken = jwt.sign(
    { id: user.id, name: user.name, email: user.email },
    secretKey,
    { expiresIn: '1h' }
  );

  // Return the access token and user information
  res.json({ accessToken, name: user.name, email: user.email });
}
