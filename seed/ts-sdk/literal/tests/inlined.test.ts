/**
 * This file was auto-generated by Fern from our API Definition.
 */

import { SeedLiteralClient } from "../src/Client";

const client = new SeedLiteralClient({
    environment: process.env.TESTS_BASE_URL || "test",
    version: process.env.TESTS_HEADER || "test",
    auditLogging: process.env.TESTS_HEADER || "test",
});

describe("Inlined", () => {
    test("send", async () => {
        const response = await client.inlined.send({
            temperature: 10.1,
            prompt: "You are a helpful assistant",
            stream: false,
            query: "What is the weather today",
        });
        expect(response).toEqual({ message: "The weather is sunny", status: 200, success: true });
    });
});
