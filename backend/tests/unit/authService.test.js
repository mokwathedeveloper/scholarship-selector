const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../../src/models/User');
const authService = require('../../src/services/authService');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let mongoServer;

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

      const { user, token } = await authService.register(name, email, password);

      expect(user).toBeDefined();
      expect(user.name).toBe(name);
      expect(user.email).toBe(email);
      expect(user.role).toBe('user');
      expect(token).toBeDefined();

      const foundUser = await User.findOne({ email }).exec();
      expect(foundUser).toBeDefined();
      expect(await bcrypt.compare(password, foundUser.password)).toBe(true);
    });

    it('should throw an error if user already exists', async () => {
      const name = 'Existing User';
      const email = 'existing@example.com';
      const password = 'password123';

      await authService.register(name, email, password);

      await expect(authService.register(name, email, password)).rejects.toThrow('User already exists');
    });

    it('should set role to admin if specified', async () => {
      const name = 'Admin User';
      const email = 'admin@example.com';
      const password = 'adminpassword';
      const role = 'admin';

      const { user } = await authService.register(name, email, password, role);

      expect(user.role).toBe('admin');
    });
  });

  describe('login', () => {
    it('should login a user and return user data and token', async () => {
      const name = 'Login User';
      const email = 'login@example.com';
      const password = 'loginpassword';

      await authService.register(name, email, password);

      const { user, token } = await authService.login(email, password);

      expect(user).toBeDefined();
      expect(user.email).toBe(email);
      expect(token).toBeDefined();
    });

    it('should throw an error for invalid credentials', async () => {
      const email = 'nonexistent@example.com';
      const password = 'wrongpassword';

      await expect(authService.login(email, password)).rejects.toThrow('Invalid credentials');
    });

    it('should throw an error for incorrect password', async () => {
      const name = 'Wrong Pass User';
      const email = 'wrongpass@example.com';
      const password = 'correctpassword';

      await authService.register(name, email, password);

      await expect(authService.login(email, 'incorrectpassword')).rejects.toThrow('Invalid credentials');
    });
  });
});