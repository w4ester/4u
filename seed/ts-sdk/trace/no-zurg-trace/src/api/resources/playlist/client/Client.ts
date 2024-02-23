/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as environments from "../../../../environments";
import * as core from "../../../../core";
import * as SeedTrace from "../../..";
import urlJoin from "url-join";
import * as errors from "../../../../errors";

export declare namespace Playlist {
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

export class Playlist {
    constructor(protected readonly _options: Playlist.Options = {}) {}

    /**
     * Create a new playlist
     *
     * @example
     *     await seedTrace.playlist.createPlaylist(0, {
     *         datetime: new Date("2024-01-01T00:00:00.000Z"),
     *         optionalDatetime: new Date("2024-01-01T00:00:00.000Z"),
     *         body: {
     *             name: "string",
     *             problems: ["string"]
     *         }
     *     })
     */
    public async createPlaylist(
        serviceParam: number,
        request: SeedTrace.CreatePlaylistRequest,
        requestOptions?: Playlist.RequestOptions
    ): Promise<SeedTrace.Playlist> {
        const { datetime, optionalDatetime, body: _body } = request;
        const _queryParams: Record<string, string | string[]> = {};
        _queryParams["datetime"] = datetime;
        if (optionalDatetime != null) {
            _queryParams["optionalDatetime"] = optionalDatetime;
        }

        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.SeedTraceEnvironment.Prod,
                `/v2/playlist/${serviceParam}/create`
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
            queryParameters: _queryParams,
            body: _body,
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
        });
        if (_response.ok) {
            return _response.body as SeedTrace.Playlist;
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
     * Returns the user's playlists
     *
     * @example
     *     await seedTrace.playlist.getPlaylists(0, {
     *         limit: 0,
     *         otherField: "string",
     *         multiLineDocs: "string",
     *         optionalMultipleField: "string",
     *         multipleField: "string"
     *     })
     */
    public async getPlaylists(
        serviceParam: number,
        request: SeedTrace.GetPlaylistsRequest,
        requestOptions?: Playlist.RequestOptions
    ): Promise<SeedTrace.Playlist[]> {
        const { limit, otherField, multiLineDocs, optionalMultipleField, multipleField } = request;
        const _queryParams: Record<string, string | string[]> = {};
        if (limit != null) {
            _queryParams["limit"] = limit.toString();
        }

        _queryParams["otherField"] = otherField;
        _queryParams["multiLineDocs"] = multiLineDocs;
        if (optionalMultipleField != null) {
            if (Array.isArray(optionalMultipleField)) {
                _queryParams["optionalMultipleField"] = optionalMultipleField.map((item) => item);
            } else {
                _queryParams["optionalMultipleField"] = optionalMultipleField;
            }
        }

        if (Array.isArray(multipleField)) {
            _queryParams["multipleField"] = multipleField.map((item) => item);
        } else {
            _queryParams["multipleField"] = multipleField;
        }

        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.SeedTraceEnvironment.Prod,
                `/v2/playlist/${serviceParam}/all`
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
            queryParameters: _queryParams,
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
        });
        if (_response.ok) {
            return _response.body as SeedTrace.Playlist[];
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
     * Returns a playlist
     * @throws {@link SeedTrace.PlaylistIdNotFoundError}
     * @throws {@link SeedTrace.UnauthorizedError}
     *
     * @example
     *     await seedTrace.playlist.getPlaylist(0, "string")
     *
     * @example
     *     await seedTrace.playlist.getPlaylist(0, "string")
     *
     * @example
     *     await seedTrace.playlist.getPlaylist(0, "string")
     */
    public async getPlaylist(
        serviceParam: number,
        playlistId: SeedTrace.PlaylistId,
        requestOptions?: Playlist.RequestOptions
    ): Promise<SeedTrace.Playlist> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.SeedTraceEnvironment.Prod,
                `/v2/playlist/${serviceParam}/${playlistId}`
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
            return _response.body as SeedTrace.Playlist;
        }

        if (_response.error.reason === "status-code") {
            switch ((_response.error.body as any)?.["errorName"]) {
                case "PlaylistIdNotFoundError":
                    throw new SeedTrace.PlaylistIdNotFoundError(
                        _response.error.body as SeedTrace.PlaylistIdNotFoundErrorBody
                    );
                case "UnauthorizedError":
                    throw new SeedTrace.UnauthorizedError();
                default:
                    throw new errors.SeedTraceError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.body,
                    });
            }
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
     * Updates a playlist
     * @throws {@link SeedTrace.PlaylistIdNotFoundError}
     *
     * @example
     *     await seedTrace.playlist.updatePlaylist(0, "string", {
     *         name: "string",
     *         problems: ["string"]
     *     })
     *
     * @example
     *     await seedTrace.playlist.updatePlaylist(0, "string", {
     *         name: "string",
     *         problems: ["string"]
     *     })
     */
    public async updatePlaylist(
        serviceParam: number,
        playlistId: SeedTrace.PlaylistId,
        request?: SeedTrace.UpdatePlaylistRequest,
        requestOptions?: Playlist.RequestOptions
    ): Promise<SeedTrace.Playlist | undefined> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.SeedTraceEnvironment.Prod,
                `/v2/playlist/${serviceParam}/${playlistId}`
            ),
            method: "PUT",
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
            body: request != null ? request : undefined,
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
        });
        if (_response.ok) {
            return _response.body as SeedTrace.Playlist | undefined;
        }

        if (_response.error.reason === "status-code") {
            switch ((_response.error.body as any)?.["errorName"]) {
                case "PlaylistIdNotFoundError":
                    throw new SeedTrace.PlaylistIdNotFoundError(
                        _response.error.body as SeedTrace.PlaylistIdNotFoundErrorBody
                    );
                default:
                    throw new errors.SeedTraceError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.body,
                    });
            }
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
     * Deletes a playlist
     *
     * @example
     *     await seedTrace.playlist.deletePlaylist(0, "string")
     */
    public async deletePlaylist(
        serviceParam: number,
        playlistId: SeedTrace.PlaylistId,
        requestOptions?: Playlist.RequestOptions
    ): Promise<void> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.SeedTraceEnvironment.Prod,
                `/v2/playlist/${serviceParam}/${playlistId}`
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

    protected async _getAuthorizationHeader() {
        const bearer = await core.Supplier.get(this._options.token);
        if (bearer != null) {
            return `Bearer ${bearer}`;
        }

        return undefined;
    }
}
