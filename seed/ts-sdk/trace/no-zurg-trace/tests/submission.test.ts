/**
 * This file was auto-generated by Fern from our API Definition.
 */

import { SeedTraceClient } from "../src/Client";

const client = new SeedTraceClient({
    environment: process.env.TESTS_BASE_URL || "test",
    token: process.env.TESTS_AUTH || "test",
});

describe("Submission", () => {
    test("constructor", () => {
        expect(client.submission).toBeDefined();
    });
});
