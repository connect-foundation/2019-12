// module.exports = {
//   verbose: true,
// };

module.exports = {
  verbose: true,
  // testRegex: '.*src/.*spec.(tsx?)',
  // testMatch: [
  // '**/src/**/*.(js|ts|tsx)',
  // '**/src/**/?(*.)+(spec).(ts|tsx)',
  // '**/src/**/*.spec.tsx',
  // ],
  testEnvironment: 'node',
  // setupFilesAfterEnv: ['./src/setupTests.ts'],

  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts?(x)', 'src/**/*.ts?(x)'],
  coverageDirectory: './coverage',
  coverageReporters: ['json', 'lcov', 'text'],

  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  // testRegex: '\\.spec\\.tsx?$',
  testRegex: '.*src/.*spec.(tsx?)',
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  globals: {
    'ts-jest': {
      enableTsDiagnostics: true,
    },
  },
};
