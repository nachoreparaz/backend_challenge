/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {}],
  },
  "testMatch": [
      "**/tests/*.[jt]s?(x)",
      "**/?(*.)+(spec|test).[tj]s?(x)"
    ]
};
