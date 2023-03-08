import { GeneratedAliasTypeSchema } from "./GeneratedAliasTypeSchema";
import { GeneratedEnumTypeSchema } from "./GeneratedEnumTypeSchema";
import { GeneratedObjectTypeSchema } from "./GeneratedObjectTypeSchema";
import { GeneratedUndiscriminatedUnionTypeSchema } from "./GeneratedUndiscriminatedUnionTypeSchema";
import { GeneratedUnionTypeSchema } from "./GeneratedUnionTypeSchema";
import { TypeSchemaContext } from "./TypeSchemaContext";

export type GeneratedTypeSchema<Context = TypeSchemaContext> =
    | GeneratedAliasTypeSchema<Context>
    | GeneratedEnumTypeSchema<Context>
    | GeneratedUnionTypeSchema<Context>
    | GeneratedUndiscriminatedUnionTypeSchema<Context>
    | GeneratedObjectTypeSchema<Context>;
