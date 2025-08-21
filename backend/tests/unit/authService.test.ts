import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import User, { IUser } from '../../src/models/User';
import { register, login } from '../../src/services/authService'; // Import named exports
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthServiceResponse } from '../../src/types/auth'; // Import AuthServiceResponse

let mongoServer: MongoMemoryServer;

describe('Auth Service', () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  });

  afterEach(async () => {
    await User.deleteMany({}).exec();
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  describe('register', () => {
    it('should register a new user and return user data and token', async () => {
      const name = 'Test User';
      const email = 'register@example.com';
      const password = 'password123';

      const { user, token }: AuthServiceResponse = await register(name, email, password); // Type return

      expect(user).toBeDefined();
      expect(user.name).toBe(name);
      expect(user.email).toBe(email);
      expect(user.role).toBe('user');
      expect(token).toBeDefined();

      const foundUser: IUser | null = await User.findOne({ email }).exec(); // Type foundUser
      expect(foundUser).toBeDefined();
      expect(await bcrypt.compare(password, foundUser!.password as string)).toBe(true); // Assert foundUser is not null
    });

    it('should throw an error if user already exists', async () => {
      const name = 'Existing User';
      const email = 'existing@example.com';
      const password = 'password123';

      await register(name, email, password);

      await expect(register(name, email, password)).rejects.toThrow('User already exists');
    });

    it('should set role to admin if specified', async () => {
      const name = 'Admin User';
      const email = 'admin@example.com';
      const password = 'adminpassword';
      const role = 'admin';

      const { user }: AuthServiceResponse = await register(name, email, password, role); // Type return

      expect(user.role).toBe('admin');
    });
  });

  describe('login', () => {
    it('should login a user and return user data and token', async () => {
      const name = 'Login User';
      const email = 'login@example.com';
      const password = 'loginpassword';

      await register(name, email, password);

      const { user, token }: AuthServiceResponse = await login(email, password); // Type return

      expect(user).toBeDefined();
      expect(user.email).toBe(email);
      expect(token).toBeDefined();
    });

    it('should throw an error for invalid credentials', async () => {
      const email = 'nonexistent@example.com';
      const password = 'wrongpassword';

      await expect(login(email, password)).rejects.toThrow('Invalid credentials');
    });

    it('should throw an error for incorrect password', async () => {
      const name = 'Wrong Pass User';
      const email = 'wrongpass@example.com';
      const password = 'correctpassword';

      await register(name, email, password);

      await expect(login(email, 'incorrectpassword')).rejects.toThrow('Invalid credentials');
    });
  });
});