/**
 * This file was auto-generated by Fern from our API Definition.
 */

import { FiddleClient } from "../../src/Client";

const client = new FiddleClient({
    environment: process.env.TESTS_BASE_URL || "test",
    token: process.env.TESTS_AUTH || "test",
});

describe("HttpMethods", () => {
    test("constructor", () => {
        expect(client.endpoints.httpMethods).toBeDefined();
    });
});
