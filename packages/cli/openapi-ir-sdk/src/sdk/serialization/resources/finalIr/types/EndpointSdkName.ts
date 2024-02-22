/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../..";
import * as FernOpenapiIr from "../../../../api";
import * as core from "../../../../core";

export const EndpointSdkName: core.serialization.ObjectSchema<
    serializers.EndpointSdkName.Raw,
    FernOpenapiIr.EndpointSdkName
> = core.serialization.objectWithoutOptionalProperties({
    groupName: core.serialization.list(core.serialization.lazy(async () => (await import("../../..")).SdkGroupName)),
    methodName: core.serialization.string(),
});

export declare namespace EndpointSdkName {
    interface Raw {
        groupName: serializers.SdkGroupName.Raw[];
        methodName: string;
    }
}
