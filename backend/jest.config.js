module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'],
  globalSetup: './jest.setup.ts', // Path to your global setup file
  globalTeardown: './jest.teardown.ts', // Path to your global teardown file
};