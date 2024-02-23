/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as environments from "../../../../environments";
import * as core from "../../../../core";
import * as SeedTrace from "../../..";
import urlJoin from "url-join";
import * as errors from "../../../../errors";

export declare namespace Submission {
    interface Options {
        environment?: core.Supplier<environments.SeedTraceEnvironment | string>;
        token?: core.Supplier<core.BearerToken | undefined>;
        xRandomHeader?: core.Supplier<string | undefined>;
    }

    interface RequestOptions {
        timeoutInSeconds?: number;
        maxRetries?: number;
    }
}

/**
 * Responsible for spinning up and spinning down execution.
 */
export class Submission {
    constructor(protected readonly _options: Submission.Options = {}) {}

    /**
     * Returns sessionId and execution server URL for session. Spins up server.
     *
     * @example
     *     await seedTrace.submission.createExecutionSession(SeedTrace.Language.Java)
     */
    public async createExecutionSession(
        language: SeedTrace.Language,
        requestOptions?: Submission.RequestOptions
    ): Promise<SeedTrace.ExecutionSessionResponse> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.SeedTraceEnvironment.Prod,
                `/sessions/create-session/${language}`
            ),
            method: "POST",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Random-Header":
                    (await core.Supplier.get(this._options.xRandomHeader)) != null
                        ? await core.Supplier.get(this._options.xRandomHeader)
                        : undefined,
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "",
                "X-Fern-SDK-Version": "0.0.1",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
            },
            contentType: "application/json",
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
        });
        if (_response.ok) {
            return _response.body as SeedTrace.ExecutionSessionResponse;
        }

        if (_response.error.reason === "status-code") {
            throw new errors.SeedTraceError({
                statusCode: _response.error.statusCode,
                body: _response.error.body,
            });
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.SeedTraceError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.SeedTraceTimeoutError();
            case "unknown":
                throw new errors.SeedTraceError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * Returns execution server URL for session. Returns empty if session isn't registered.
     *
     * @example
     *     await seedTrace.submission.getExecutionSession("string")
     */
    public async getExecutionSession(
        sessionId: string,
        requestOptions?: Submission.RequestOptions
    ): Promise<SeedTrace.ExecutionSessionResponse | undefined> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.SeedTraceEnvironment.Prod,
                `/sessions/${sessionId}`
            ),
            method: "GET",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Random-Header":
                    (await core.Supplier.get(this._options.xRandomHeader)) != null
                        ? await core.Supplier.get(this._options.xRandomHeader)
                        : undefined,
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "",
                "X-Fern-SDK-Version": "0.0.1",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
            },
            contentType: "application/json",
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
        });
        if (_response.ok) {
            return _response.body as SeedTrace.ExecutionSessionResponse | undefined;
        }

        if (_response.error.reason === "status-code") {
            throw new errors.SeedTraceError({
                statusCode: _response.error.statusCode,
                body: _response.error.body,
            });
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.SeedTraceError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.SeedTraceTimeoutError();
            case "unknown":
                throw new errors.SeedTraceError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * Stops execution session.
     *
     * @example
     *     await seedTrace.submission.stopExecutionSession("string")
     */
    public async stopExecutionSession(sessionId: string, requestOptions?: Submission.RequestOptions): Promise<void> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.SeedTraceEnvironment.Prod,
                `/sessions/stop/${sessionId}`
            ),
            method: "DELETE",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Random-Header":
                    (await core.Supplier.get(this._options.xRandomHeader)) != null
                        ? await core.Supplier.get(this._options.xRandomHeader)
                        : undefined,
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "",
                "X-Fern-SDK-Version": "0.0.1",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
            },
            contentType: "application/json",
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
        });
        if (_response.ok) {
            return;
        }

        if (_response.error.reason === "status-code") {
            throw new errors.SeedTraceError({
                statusCode: _response.error.statusCode,
                body: _response.error.body,
            });
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.SeedTraceError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.SeedTraceTimeoutError();
            case "unknown":
                throw new errors.SeedTraceError({
                    message: _response.error.errorMessage,
                });
        }
    }

    public async getExecutionSessionsState(
        requestOptions?: Submission.RequestOptions
    ): Promise<SeedTrace.GetExecutionSessionStateResponse> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.SeedTraceEnvironment.Prod,
                "/sessions/execution-sessions-state"
            ),
            method: "GET",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Random-Header":
                    (await core.Supplier.get(this._options.xRandomHeader)) != null
                        ? await core.Supplier.get(this._options.xRandomHeader)
                        : undefined,
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "",
                "X-Fern-SDK-Version": "0.0.1",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
            },
            contentType: "application/json",
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
        });
        if (_response.ok) {
            return _response.body as SeedTrace.GetExecutionSessionStateResponse;
        }

        if (_response.error.reason === "status-code") {
            throw new errors.SeedTraceError({
                statusCode: _response.error.statusCode,
                body: _response.error.body,
            });
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.SeedTraceError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.SeedTraceTimeoutError();
            case "unknown":
                throw new errors.SeedTraceError({
                    message: _response.error.errorMessage,
                });
        }
    }

    protected async _getAuthorizationHeader() {
        const bearer = await core.Supplier.get(this._options.token);
        if (bearer != null) {
            return `Bearer ${bearer}`;
        }

        return undefined;
    }
}
