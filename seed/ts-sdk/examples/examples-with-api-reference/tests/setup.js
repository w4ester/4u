const { setup: setupDevServer } = require("jest-dev-server");

const PORT = 56157;

module.exports = async function globalSetup() {
    process.env.TESTS_BASE_URL = `http://localhost:${PORT}`;

    globalThis.servers = await setupDevServer({
        command: `node config/start.js --port=${PORT}`,
        launchTimeout: 10_000,
        port: PORT,
    });
};
