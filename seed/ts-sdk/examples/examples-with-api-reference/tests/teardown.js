const { teardown: teardownDevServer } = require("jest-dev-server");

module.exports = async function globalSetup() {
    await teardownDevServer(globalThis.servers);
};
