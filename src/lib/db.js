import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
  connectTimeoutMS: 5000,
  serverSelectionTimeoutMS: 5000,
};

let client;
let clientPromise;

if (!process.env.MONGODB_URI && process.env.NODE_ENV === 'production') {
  console.warn('Warning: MONGODB_URI is missing. Database features will fail at runtime.');
}

if (process.env.MONGODB_URI) {
  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
} else {
  clientPromise = Promise.reject(new Error('MONGODB_URI is not defined'));
}

export default clientPromise;
