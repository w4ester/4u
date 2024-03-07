import { z } from "zod";
import { ApiAuthSchema } from "../ApiAuthSchema";
import { AuthSchemeDeclarationSchema } from "../AuthSchemeDeclarationSchema";
import { EnvironmentSchema } from "../EnvironmentSchema";
import { ErrorDiscriminationSchema } from "../ErrorDiscriminationSchema";
import { HttpHeaderSchema } from "../HttpHeaderSchema";
import { HttpPathParameterSchema } from "../HttpPathParameterSchema";
import { PaginationSchema } from "../PaginationSchema";
import { VariableDeclarationSchema } from "../VariableDeclarationSchema";

export const BaseApiFileSchema = z.strictObject({
    auth: z.optional(ApiAuthSchema),
    "auth-schemes": z.optional(z.record(AuthSchemeDeclarationSchema)),
    "default-environment": z.optional(z.string().or(z.null())),
    environments: z.optional(z.record(z.string(), EnvironmentSchema))
});

export type BaseApiFileSchema = z.infer<typeof BaseApiFileSchema>;

export const RootApiFileSchema = BaseApiFileSchema.extend({
    name: z.string(), // TODO: should this be migrated to id?
    "display-name": z.optional(z.string()),
    imports: z.optional(z.record(z.string())),
    headers: z.optional(z.record(z.string(), HttpHeaderSchema)),
    "error-discrimination": z.optional(ErrorDiscriminationSchema),
    audiences: z.optional(z.array(z.string())),
    docs: z.optional(z.string()),
    errors: z.optional(z.array(z.string())),
    "base-path": z.optional(z.string()),
    ["path-parameters"]: z.optional(z.record(HttpPathParameterSchema)),
    "idempotency-headers": z.optional(z.record(z.string(), HttpHeaderSchema)),
    variables: z.optional(z.record(VariableDeclarationSchema)),
    pagination: z.optional(PaginationSchema)
});

export type RootApiFileSchema = z.infer<typeof RootApiFileSchema>;
