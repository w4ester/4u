/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as SeedTrace from "../../../..";

/**
 * @example
 *     {
 *         result: {
 *             result: {},
 *             stdout: "string"
 *         },
 *         traceResponses: [{
 *                 submissionId: "d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32",
 *                 lineNumber: 0,
 *                 returnValue: {
 *                     type: "integerValue",
 *                     value: 0
 *                 },
 *                 expressionLocation: {},
 *                 stack: {},
 *                 stdout: "string"
 *             }]
 *     }
 */
export interface StoreTracedTestCaseRequest {
    result: SeedTrace.TestCaseResultWithStdout;
    traceResponses: SeedTrace.TraceResponse[];
}
