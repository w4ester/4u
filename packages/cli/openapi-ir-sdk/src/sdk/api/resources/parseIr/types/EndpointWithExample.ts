/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernOpenapiIr from "../../..";

export interface EndpointWithExample extends FernOpenapiIr.WithDescription {
    authed: boolean;
    internal: boolean | undefined;
    method: FernOpenapiIr.HttpMethod;
    availability: FernOpenapiIr.EndpointAvailability | undefined;
    audiences: string[];
    /**
     * This string includes templated path parameters.
     * For example, `/users/{userId}` is a valid value.
     */
    path: string;
    summary: string | undefined;
    operationId: string | undefined;
    tags: FernOpenapiIr.TagId[];
    pathParameters: FernOpenapiIr.PathParameterWithExample[];
    queryParameters: FernOpenapiIr.QueryParameterWithExample[];
    headers: FernOpenapiIr.HeaderWithExample[];
    sdkName: FernOpenapiIr.EndpointSdkName | undefined;
    /** Populated as ${operationId}Request */
    generatedRequestName: string;
    /** Populated by `x-request-name` on a path object. */
    requestNameOverride: string | undefined;
    request: FernOpenapiIr.RequestWithExample | undefined;
    response: FernOpenapiIr.ResponseWithExample | undefined;
    errorStatusCode: FernOpenapiIr.StatusCode[];
    server: FernOpenapiIr.Server[];
    /**
     * Populated by `x-fern-examples` on a path object.
     * Also migrated from `x-readme.code-samples` if present.
     */
    examples: FernOpenapiIr.EndpointExample[];
}
