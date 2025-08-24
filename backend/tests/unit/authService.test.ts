// Mock bcrypt module
jest.mock('bcryptjs', () => ({
  genSalt: jest.fn().mockResolvedValue('mockSalt'),
  hash: jest.fn().mockResolvedValue('hashedPassword'),
  compare: jest.fn(), // Add compare as it's used in login
}));

// Mock jsonwebtoken module
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('mockToken'),
  verify: jest.fn(), // Add verify as it might be used elsewhere or in future tests
}));

// Mock the User model
jest.mock('../../src/models/User', () => {
  const mockUser = {
    _id: 'someUserId',
    name: 'Test User',
    email: 'test@example.com',
    password: 'hashedPassword',
    role: 'user',
    createdAt: new Date(),
    updatedAt: new Date(),
    comparePassword: jest.fn(),
    save: jest.fn().mockResolvedValue(this), // Mock save method
    refreshToken: [] as string[], // Add refreshToken property
  };

  const mockUserAdmin = {
    _id: 'someAdminId',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'hashedAdminPassword',
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
    comparePassword: jest.fn(),
    save: jest.fn().mockResolvedValue(this), // Mock save method
    refreshToken: [] as string[], // Add refreshToken property
  };

  return {
    __esModule: true,
    default: {
      findOne: jest.fn(() => ({
        exec: jest.fn().mockResolvedValue(null), // Default to user not found
      })),
      create: jest.fn(),
      deleteMany: jest.fn().mockResolvedValue({ deletedCount: 1 }), // Mock deleteMany
      // Add a way to access the mockUser and mockUserAdmin instances if needed for specific tests
      // For example, by returning them from findOne or create
    },
    mockUser: mockUser, // Export mockUser for direct access in tests
    mockUserAdmin: mockUserAdmin, // Export mockUserAdmin for direct access in tests
  };
});

import { register, login } from '../../src/services/authService';
import bcrypt from 'bcryptjs'; // Keep import for type inference if needed, but actual calls are mocked
import jwt from 'jsonwebtoken'; // Keep import for type inference if needed, but actual calls are mocked
import { AuthServiceResponse } from '../../src/types/auth';

// Import the mocked User model and its exported mock instances
import User, { mockUser, mockUserAdmin } from '../../src/models/User';

// Cast the mocked User to a Jest mock for easier access
const MockedUser = User as jest.Mocked<typeof User>;

describe('Auth Service', () => {
  beforeEach(() => {
    // Reset mocks before each test
    MockedUser.findOne.mockReset();
    MockedUser.create.mockReset();
    MockedUser.deleteMany.mockReset();

    // Reset mockUser and mockUserAdmin properties
    mockUser.comparePassword.mockReset();
    mockUser.save.mockReset();
    mockUser.refreshToken = []; // Reset refresh tokens
    mockUserAdmin.comparePassword.mockReset();
    mockUserAdmin.save.mockReset();
    mockUserAdmin.refreshToken = []; // Reset refresh tokens
  });

  describe('register', () => {
    it('should register a new user and return user data and token', async () => {
      const name = 'Test User';
      const email = 'register@example.com';
      const password = 'password123';

      // Mock the return value of User.findOne and User.create
      MockedUser.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue(null), // User does not exist
      });
      MockedUser.create.mockResolvedValue(mockUser); // Successfully created user

      const { user, token, refreshToken }: AuthServiceResponse = await register(name, email, password);

      expect(MockedUser.findOne).toHaveBeenCalledWith({ email });
      expect(MockedUser.create).toHaveBeenCalledWith({
        name,
        email,
        password: 'hashedPassword',
        role: 'user',
      });
      expect(user).toBeDefined();
      expect(user.name).toBe(name);
      expect(user.email).toBe(email);
      expect(user.role).toBe('user');
      expect(token).toBe('mockToken');
      expect(refreshToken).toBe('mockToken');
      expect(mockUser.save).toHaveBeenCalled(); // Ensure save was called
      expect(mockUser.refreshToken).toEqual(['mockToken']); // Ensure refresh token is stored
    });

    it('should throw an error if user already exists', async () => {
      const name = 'Existing User';
      const email = 'existing@example.com';
      const password = 'password123';

      MockedUser.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue(mockUser), // User already exists
      });

      await expect(register(name, email, password)).rejects.toThrow('User already exists');
      expect(MockedUser.create).not.toHaveBeenCalled();
    });

    it('should set role to admin if specified', async () => {
      const name = 'Admin User';
      const email = 'admin@example.com';
      const password = 'adminpassword';
      const role = 'admin';

      MockedUser.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue(null),
      });
      MockedUser.create.mockResolvedValue(mockUserAdmin); // Successfully created admin user

      const { user }: AuthServiceResponse = await register(name, email, password, role);

      expect(MockedUser.create).toHaveBeenCalledWith({
        name,
        email,
        password: 'hashedPassword',
        role: 'admin',
      });
      expect(user.role).toBe('admin');
    });
  });

  describe('login', () => {
    it('should login a user and return user data and token', async () => {
      const email = 'login@example.com';
      const password = 'loginpassword';

      const userInstance = {
        _id: 'someUserId',
        name: 'Login User',
        email: email,
        password: 'hashedPassword',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
        comparePassword: jest.fn().mockResolvedValue(true),
        save: jest.fn().mockResolvedValue(this),
        refreshToken: [] as string[],
      };

      MockedUser.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue(userInstance), // User found
      });

      const { user, token, refreshToken }: AuthServiceResponse = await login(email, password);

      expect(MockedUser.findOne).toHaveBeenCalledWith({ email });
      expect(userInstance.comparePassword).toHaveBeenCalledWith(password);
      expect(user).toBeDefined();
      expect(user.email).toBe(email);
      expect(token).toBe('mockToken');
      expect(refreshToken).toBe('mockToken');
      expect(userInstance.save).toHaveBeenCalled();
      expect(userInstance.refreshToken).toEqual(['mockToken']);
    });

    it('should throw an error for invalid credentials (user not found)', async () => {
      const email = 'nonexistent@example.com';
      const password = 'wrongpassword';

      MockedUser.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue(null), // User not found
      });

      await expect(login(email, password)).rejects.toThrow('Invalid credentials');
    });

    it('should throw an error for incorrect password', async () => {
      const email = 'wrongpass@example.com';
      const password = 'correctpassword';

      const userInstance = {
        _id: 'someUserId',
        name: 'Wrong Pass User',
        email: email,
        password: 'hashedPassword',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
        comparePassword: jest.fn().mockResolvedValue(false),
        save: jest.fn().mockResolvedValue(this),
        refreshToken: [] as string[],
      };

      MockedUser.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue(userInstance), // User found
      });

      await expect(login(email, 'incorrectpassword')).rejects.toThrow('Invalid credentials');
      expect(userInstance.comparePassword).toHaveBeenCalledWith('incorrectpassword');
    });
  });
});