// Example API route for storing data in MongoDB
import clientPromise from './mongodb.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  try {
    const client = await clientPromise;
    const db = client.db('aditya_website'); // Change DB name as needed
    const collection = db.collection('storage');
    const result = await collection.insertOne(req.body);
    res.status(200).json({ success: true, insertedId: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
