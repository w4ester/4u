import { BaseApiFileSchema } from "@fern-api/yaml-schema";
import { z } from "zod";
import { GeneratorsOpenAPIObjectSchema } from "./GeneratorsOpenAPIObjectSchema";

export const OPENAPI_LOCATION_KEY = "api_path";
export const OPENAPI_OVERRIDES_LOCATION_KEY = "api_overrides_path";

export const GeneratorApiOpenApiSubSchema = GeneratorsOpenAPIObjectSchema.extend({
    environment: z.optional(z.string()),
    namespaced: z.optional(z.boolean())
});

export const GeneratorApiConfigSchema = BaseApiFileSchema.extend({
    openapi: z.optional(z.record(GeneratorApiOpenApiSubSchema))
});

export type GeneratorApiConfigSchema = z.infer<typeof GeneratorApiConfigSchema>;
