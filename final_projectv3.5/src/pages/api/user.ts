import { NextApiRequest, NextApiResponse } from 'next';

let userData = {
  id: 1,
  name: 'Rovick Anthony Pasamonte',
  email: 'rovickpasamonte@gmail.com',
  bio: 'Third Year Computer Science Student, Block 1',
  post: [
    {
      title: "Note 1",
      content: "Create a Website Using Next.js",
      date: "05/31/2024 - 00:05"
    },
    {
      title: "Note 2",
      content: "Deploy it and pass at 5pm",
      date: "05/31/2024 - 00:09"
    }
  ]
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(userData);
  } else if (req.method === 'PUT') {
    const { id, name, email, bio, post } = req.body;
    if (!id || !name || !email || !bio || !post) {
      res.status(400).json({ error: "Missing required fields" });
    } else {
      userData = { id, name, email, bio, post };
      res.status(200).json(userData);
    }
  } else if (req.method === 'POST') {
    const { name, email, bio, post } = req.body;
    if (!name || !email || !bio || !post) {
      res.status(400).json({ error: "Missing required fields" });
    } else {
      const id = userData.id + 1;
      userData = { id, name, email, bio, post };
      res.status(201).json(userData);
    }
  } else if (req.method === 'DELETE') {
    userData = {
      id: 1,
      name: '',
      email: '',
      bio: '',
      post: []
    };
    res.status(200).end('User data deleted successfully');
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
