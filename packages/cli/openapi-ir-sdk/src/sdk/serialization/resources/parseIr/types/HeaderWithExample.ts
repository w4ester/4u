/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../..";
import * as FernOpenapiIr from "../../../../api";
import * as core from "../../../../core";

export const HeaderWithExample: core.serialization.ObjectSchema<
    serializers.HeaderWithExample.Raw,
    FernOpenapiIr.HeaderWithExample
> = core.serialization
    .objectWithoutOptionalProperties({
        name: core.serialization.string(),
        schema: core.serialization.lazy(async () => (await import("../../..")).SchemaWithExample),
        parameterNameOverride: core.serialization.string().optional(),
    })
    .extend(core.serialization.lazyObject(async () => (await import("../../..")).WithDescription));

export declare namespace HeaderWithExample {
    interface Raw extends serializers.WithDescription.Raw {
        name: string;
        schema: serializers.SchemaWithExample.Raw;
        parameterNameOverride?: string | null;
    }
}
