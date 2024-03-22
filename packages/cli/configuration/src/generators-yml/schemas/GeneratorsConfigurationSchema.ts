import { z } from "zod";
import { GeneratorGroupSchema } from "./GeneratorGroupSchema";
import { GeneratorsOpenAPISchema } from "./GeneratorsOpenAPISchema";
import { WhitelabelConfigurationSchema } from "./WhitelabelConfigurationSchema";

/**
 * @example
 * api: openapi.yml
 *
 * @example
 * api: asyncapi.yml
 */
export const APIDefinitionPathSchema = z.string().describe("Path to the OpenAPI, AsyncAPI or Fern Definition");

/**
 * @example
 * api:
 *  path: openapi.yml
 *  overrides: overrides.yml
 *
 * @example
 * api:
 *  path: asyncapi.yml
 *  overrides: overrides.yml
 */
export const APIDefintionWithOverridesSchema = z.object({
    path: APIDefinitionPathSchema,
    overrides: z.optional(z.string()).describe("Path to the OpenAPI or AsyncAPI overrides")
});
// namespace: z.optional(z.string()).describe("The subpackage or namespace to nest this API under.")

/**
 * @example
 * api:
 *  - path: openapi.yml
 *    overrides: overrides.yml
 *  - openapi.yml
 */
export const APIDefinitionList = z.array(z.union([APIDefinitionPathSchema, APIDefintionWithOverridesSchema]));

export const APIDefinitionSchemaInner = z.union([
    APIDefinitionPathSchema,
    APIDefintionWithOverridesSchema,
    APIDefinitionList
]);

/**
 * @example
 * api:
 *  myPackage: openapi.yml
 *  myOtherPackage:
 *      - path: asyncapi.yml
 *        overrides: overrides.yml
 *      - path: openapi.yml
 *  myThirdPackage:
 *     path: openapi.yml
 *     overrides: overrides.yml
 */
export const APIDefinitionNamespaced = z.record(z.string(), APIDefinitionSchemaInner);

export const APIDefinitionSchema = z.union([
    APIDefinitionPathSchema,
    APIDefintionWithOverridesSchema,
    APIDefinitionList,
    APIDefinitionNamespaced
]);

export const DEFAULT_GROUP_GENERATORS_CONFIG_KEY = "default-group";
export const OPENAPI_LOCATION_KEY = "openapi";
export const OPENAPI_OVERRIDES_LOCATION_KEY = "openapi-overrides";
export const ASYNC_API_LOCATION_KEY = "async-api";

export const GeneratorsConfigurationSchema = z.strictObject({
    api: z.optional(APIDefinitionSchema),

    whitelabel: z.optional(WhitelabelConfigurationSchema),

    [DEFAULT_GROUP_GENERATORS_CONFIG_KEY]: z.optional(z.string()),
    groups: z.optional(z.record(GeneratorGroupSchema)),

    // deprecated, use the `api` key instead
    [OPENAPI_LOCATION_KEY]: z.optional(GeneratorsOpenAPISchema),
    [OPENAPI_OVERRIDES_LOCATION_KEY]: z.optional(z.string()),
    [ASYNC_API_LOCATION_KEY]: z.optional(z.string())
});

export type GeneratorsConfigurationSchema = z.infer<typeof GeneratorsConfigurationSchema>;
export type APIDefinitionSchema = z.infer<typeof APIDefinitionSchema>;
