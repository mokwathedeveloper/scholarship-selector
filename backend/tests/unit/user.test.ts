import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import User, { IUser } from '../../src/models/User'; // Import IUser

jest.setTimeout(30000); // Increase timeout for this test suite

let mongoServer: MongoMemoryServer;

describe('User Model', () => {
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

  it('should create a new user successfully', async () => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    };
    const user = new User(userData);
    const savedUser: IUser = await user.save(); // Type savedUser

    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(userData.name);
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.role).toBe('user');
  });

  it('should not save user without required fields', async () => {
    const user = new User({});
    let err: mongoose.Error.ValidationError | undefined; // Type err
    try {
      await user.save();
    } catch (error: unknown) { // Type error as unknown
      err = error as mongoose.Error.ValidationError; // Cast to ValidationError
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err?.errors?.name).toBeDefined(); // Use optional chaining
    expect(err?.errors?.email).toBeDefined();
    expect(err?.errors?.password).toBeDefined();
  });

  it('should not save user with duplicate email', async () => {
    expect.assertions(2);
    const userData1 = {
      name: 'User One',
      email: 'duplicate@example.com',
      password: 'password123',
    };
    const userData2 = {
      name: 'User Two',
      email: 'duplicate@example.com',
      password: 'password456',
    };

    await new User(userData1).save();

    try {
      await new User(userData2).save();
    } catch (error: any) { // Use any for now for simplicity with error.code
      expect(error).toBeDefined();
      expect(error.code).toBe(11000);
    }
  });

  it('should not save user with invalid email format', async () => {
    const userData = {
      name: 'Invalid Email User',
      email: 'invalid-email',
      password: 'password123',
    };
    const user = new User(userData);
    let err: mongoose.Error.ValidationError | undefined;
    try {
      await user.save();
    } catch (error: unknown) {
      err = error as mongoose.Error.ValidationError;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err?.errors?.email?.message).toContain('Please enter a valid email');
  });

  it('should not save user with password less than 6 characters', async () => {
    const userData = {
      name: 'Short Password User',
      email: 'shortpass@example.com',
      password: 'short',
    };
    const user = new User(userData);
    let err: mongoose.Error.ValidationError | undefined;
    try {
      await user.save();
    } catch (error: unknown) {
      err = error as mongoose.Error.ValidationError;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err?.errors?.password?.message).toContain('Password must be at least 6 characters');
  });

  it('should set role to admin if specified', async () => {
    const userData = {
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'adminpassword',
      role: 'admin',
    };
    const user = new User(userData);
    const savedUser: IUser = await user.save();

    expect(savedUser.role).toBe('admin');
  });

  it('should not save user with invalid role', async () => {
    const userData = {
      name: 'Invalid Role User',
      email: 'invalidrole@example.com',
      password: 'password123',
      role: 'superadmin',
    };
    const user = new User(userData);
    let err: mongoose.Error.ValidationError | undefined;
    try {
      await user.save();
    } catch (error: unknown) {
      err = error as mongoose.Error.ValidationError;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err?.errors?.role?.message).toContain('`superadmin` is not a valid enum value for path `role`.');
  });
});