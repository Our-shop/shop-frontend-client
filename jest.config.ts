// eslint-disable-next-line no-undef,@typescript-eslint/ban-ts-comment
// @ts-ignore
module.exports = {
  rootDir: 'src',
  preset: 'ts-jest',
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
  setupFilesAfterEnv: ['<rootDir>/setup-tests.ts'],
  testRegex: ['.*\\.test\\.ts$', '.*\\.test\\.tsx$'],
  transform: {
    '^.+\\.(js|ts)$': 'ts-jest',
  },
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.test.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!**/coverage/**',
  ],
  coverageDirectory: '../coverage',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/$1',
  },
  moduleDirectories: ['node_modules', 'src'],
  modulePathIgnorePatterns: [],
  coveragePathIgnorePatterns: ['./src/app.css'],
};
