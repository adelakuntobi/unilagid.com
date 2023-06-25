import { User } from '@/lib/models';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const users = req.body;

    // Validate the incoming request data
    if (!Array.isArray(users) || users.length === 0) {
      return res.status(400).json({ error: 'Invalid user data' });
    }


    const insertedUsers = [];

    // Insert each user document into the MongoDB collection
    for (const user of users) {
      const { firstName, lastName, age, gender, courseOfStudy } = user;

      // Validate individual user data
      if (!firstName || !lastName || !age || !gender || !courseOfStudy) {
        return res.status(400).json({ error: 'Missing required fields in user data' });
      }

      // Generate a unique ID for the user
      const id = new Date().getTime().toString();

      // Create the user object
      const newUser = {
        id,
        firstName,
        lastName,
        age,
        gender,
        courseOfStudy,
      };

      // Insert the user document into the MongoDB collection
      await User.create(newUser);

      insertedUsers.push(newUser);
    }


    return res.status(201).json({ message: 'Users created successfully', users: insertedUsers });
  } catch (error) {
    console.error('Error creating users:', error);
    return res.status(500).json({ error: 'Error creating users' });
  }
}
