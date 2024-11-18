module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], 
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.(ts|tsx)$': '@swc/jest',
  },
  transformIgnorePatterns: [
    '/node_modules/',
  ],
};
