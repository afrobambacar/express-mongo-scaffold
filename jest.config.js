const config = {
  testEnvironment: 'node',
  setupFilesAfterEnv: [
    '<rootDir>/test/setup.js'
  ],
  modulePaths: [
    '<rootDir>/src/', 
    '<rootDir>/test/'
  ],
  coverageDirectory: './coverage/',
  collectCoverage: true,
  verbose: true,
}

module.exports = config