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
  coveragePathIgnorePatterns: [
    './src/app.css',
    './src/app.tsx',
    './src/index.tsx',
    './src/repository.ts',
    './src/app/auth/api/*',
    './src/app/auth/store/*',
    './src/app/carts/store/*',
    './src/app/auth',
    './src/app/delivery/store/*',
    './src/app/products/store/*',
    './src/app/home/*',
    './src/app/user/store/*',
    './src/app/components/page-layout.com.tsx',
    './src/service-worker.js',
    './src/serviceWorkerRegistration.js',
    './src/app/auth/validation-schemas/*',
    './src/store.ts',
    './src/themes.ts',
    `/local-storage/*`,
    '/resources/*',
    '/types/*',
    '.schema.ts',
    '.routes.tsx',
    '.regex.ts',
  ],
};
