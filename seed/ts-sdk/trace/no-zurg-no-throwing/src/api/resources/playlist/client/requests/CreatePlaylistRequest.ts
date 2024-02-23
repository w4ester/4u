/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as SeedTrace from "../../../..";

/**
 * @example
 *     {
 *         datetime: new Date("2024-01-01T00:00:00.000Z"),
 *         optionalDatetime: new Date("2024-01-01T00:00:00.000Z"),
 *         body: {
 *             name: "string",
 *             problems: ["string"]
 *         }
 *     }
 */
export interface CreatePlaylistRequest {
    datetime: string;
    optionalDatetime?: string;
    body: SeedTrace.PlaylistCreateRequest;
}
