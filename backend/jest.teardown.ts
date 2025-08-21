import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

module.exports = async () => {
  const mongoServer: MongoMemoryServer = (global as any).__MONGO_SERVER__;

  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  }

  if (mongoServer) {
    await mongoServer.stop();
  }
};