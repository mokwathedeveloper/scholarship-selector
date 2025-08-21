import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;

module.exports = async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  process.env.MONGO_URI = mongoUri; // Make URI available to tests

  await mongoose.connect(mongoUri);

  // Store the mongoServer instance so it can be stopped in globalTeardown
  (global as any).__MONGO_SERVER__ = mongoServer;
};