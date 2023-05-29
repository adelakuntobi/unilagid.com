import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../utils/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id, firstName, lastName, age, gender, courseOfStudy } = req.body;

    // Validate the incoming request data
    if (!id || !firstName || !lastName || !age || !gender || !courseOfStudy) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const { client, db } = await connectToDatabase();

    // Update the user document in the MongoDB collection
    const result = await db.collection('users').updateOne(
      { id },
      {
        $set: {
          firstName,
          lastName,
          age,
          gender,
          courseOfStudy,
        },
      }
    );

    client.close();

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ error: 'Error updating user' });
  }
}
