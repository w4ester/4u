/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../..";
import * as FernOpenapiIr from "../../../../api";
import * as core from "../../../../core";

export const PrimitiveSchemaValue: core.serialization.Schema<
    serializers.PrimitiveSchemaValue.Raw,
    FernOpenapiIr.PrimitiveSchemaValue
> = core.serialization
    .union("type", {
        int: core.serialization.object({}),
        int64: core.serialization.object({}),
        float: core.serialization.object({}),
        double: core.serialization.object({}),
        string: core.serialization.lazyObject(async () => (await import("../../..")).StringSchema),
        datetime: core.serialization.object({}),
        date: core.serialization.object({}),
        base64: core.serialization.object({}),
        boolean: core.serialization.object({}),
    })
    .transform<FernOpenapiIr.PrimitiveSchemaValue>({
        transform: (value) => {
            switch (value.type) {
                case "int":
                    return FernOpenapiIr.PrimitiveSchemaValue.int();
                case "int64":
                    return FernOpenapiIr.PrimitiveSchemaValue.int64();
                case "float":
                    return FernOpenapiIr.PrimitiveSchemaValue.float();
                case "double":
                    return FernOpenapiIr.PrimitiveSchemaValue.double();
                case "string":
                    return FernOpenapiIr.PrimitiveSchemaValue.string(value);
                case "datetime":
                    return FernOpenapiIr.PrimitiveSchemaValue.datetime();
                case "date":
                    return FernOpenapiIr.PrimitiveSchemaValue.date();
                case "base64":
                    return FernOpenapiIr.PrimitiveSchemaValue.base64();
                case "boolean":
                    return FernOpenapiIr.PrimitiveSchemaValue.boolean();
                default:
                    return value as FernOpenapiIr.PrimitiveSchemaValue;
            }
        },
        untransform: ({ _visit, ...value }) => value as any,
    });

export declare namespace PrimitiveSchemaValue {
    type Raw =
        | PrimitiveSchemaValue.Int
        | PrimitiveSchemaValue.Int64
        | PrimitiveSchemaValue.Float
        | PrimitiveSchemaValue.Double
        | PrimitiveSchemaValue.String
        | PrimitiveSchemaValue.Datetime
        | PrimitiveSchemaValue.Date
        | PrimitiveSchemaValue.Base64
        | PrimitiveSchemaValue.Boolean;

    interface Int {
        type: "int";
    }

    interface Int64 {
        type: "int64";
    }

    interface Float {
        type: "float";
    }

    interface Double {
        type: "double";
    }

    interface String extends serializers.StringSchema.Raw {
        type: "string";
    }

    interface Datetime {
        type: "datetime";
    }

    interface Date {
        type: "date";
    }

    interface Base64 {
        type: "base64";
    }

    interface Boolean {
        type: "boolean";
    }
}
