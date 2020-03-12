module.exports = {
  transform: {
    '.(ts|tsx)': '<rootDir>/node_modules/ts-jest/preprocessor.js'
  },
  setupFiles: ['./jest.setup.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'node'],
  moduleDirectories: [
    "node_modules",
    "src",
    "src/app"
  ],
  collectCoverageFrom: [
    'src/app/containers/**/*.{js,jsx,ts,tsx}',
    'src/app/components/**/*.{js,jsx,ts,tsx}',
    'src/app/reducers/*.{ts}',
    '!**src/app/reducers/index.ts**',
    '!**src/app/reducers/state.ts**',
    '!**src/app/actions/**',
    '!**src/app/models/**',
    '!**src/app/store/**',
    '!**src/app/middleware/**',
    '!**/node_modules/**'
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff2|mp4|webm|wav|mp3|m4a|aac|oga|pdf)$': '<rootDir>/test/__mocks__/fileMock.js',
    '\\.(css|scss)$': 'identity-obj-proxy'
  },
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90
    }
  }
}
