import { NextApiRequest, NextApiResponse } from 'next';
import initializeDatabase from '../../lib/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
      const db = await initializeDatabase();
      await db.run(
        `INSERT INTO feedback (name, email, phone, message) VALUES (?, ?, ?, ?)`,
        [name, email, phone, message]
      );
      res.status(200).json({ success: true, message: 'Feedback submitted successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
};

export default handler;
