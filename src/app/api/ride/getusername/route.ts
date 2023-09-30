// /pages/api/ride/getusername.ts

import { NextApiRequest, NextApiResponse } from 'next';
import User from '@/models/userModels'; // Import your User model

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Get the userId from the query parameters
    const { userId } = req.query;

    const user = await User.findOne({ _id: userId }).select("-password");
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ error: "User does not exist" });
    } else {
      console.log("User found");
      return res.status(200).json({ message: "User found", user: user });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
