// MongoDB integration for storage service
// Update MONGODB_URI with your Atlas connection string later

import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'YOUR_MONGODB_ATLAS_URI_HERE';
const options = {};

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default clientPromise;
