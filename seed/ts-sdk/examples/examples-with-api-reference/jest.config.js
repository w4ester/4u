/** @type {import('jest').Config} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    globalSetup: "<rootDir>/tests/setup.js",
    globalTeardown: "<rootDir>/tests/teardown.js",
};
