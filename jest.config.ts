// @ts-ignore
module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  rootDir: 'src',
  testRegex: ['.*\\.test\\.ts$', '.*\\.test\\.tsx$'],
  transform: {
    '\\.[jt]sx?$': 'ts-jest',
  },
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.test.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!**/coverage/**',
  ],
  coveragePathIgnorePatterns: [],
  coverageDirectory: '../coverage',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/$1',
  },
  moduleDirectories: ['node_modules', 'src'],
  modulePathIgnorePatterns: [],
};
