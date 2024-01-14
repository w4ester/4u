import { assertNever } from "@fern-api/core-utils";
import {
    AliasTypeDeclaration, EnumTypeDeclaration, ExamplePrimitive,
    ExampleType,
    ExampleTypeReference,
    ExampleTypeReferenceShape,
    ExampleTypeShape,
    ObjectTypeDeclaration,
    PrimitiveType,
    TypeDeclaration,
    TypeReference,
    UndiscriminatedUnionTypeDeclaration,
    UnionTypeDeclaration
} from "@fern-fern/ir-sdk/api";
import { CasingsGenerator } from "../casings/CasingsGenerator";

export class ExampleGenerator {
    private casingsGenerator: CasingsGenerator;

    constructor(casingsGenerator: CasingsGenerator) {
        this.casingsGenerator = casingsGenerator;
    }

    public generateExampleType(typeDeclaration: TypeDeclaration): ExampleType | null {
        switch (typeDeclaration.shape.type) {
            case "alias":
                return this.generateExampleTypeForAlias(typeDeclaration.shape);
            case "enum":
                return this.generateExampleTypeForEnum(typeDeclaration.shape);
            case "object":
                return this.generateExampleTypeForObject(typeDeclaration.shape);
            case "union":
                return this.generateExampleTypeForUnion(typeDeclaration.shape);
            case "undiscriminatedUnion":
                return this.generateExampleTypeForUndiscriminatedUnion(typeDeclaration.shape);
            default:
                assertNever(typeDeclaration.shape);
        }
    }

    private generateExampleTypeForAlias(aliasDeclaration: AliasTypeDeclaration): ExampleType | null {
        return null;
    }
    
    private generateExampleTypeForEnum(enumDeclaration: EnumTypeDeclaration): ExampleType | null {
        if (enumDeclaration.values.length === 0 || enumDeclaration.values[0] == null) {
            return null;
        }
        const exampleEnumValue = enumDeclaration.values[0];
        return this.newNamelessExampleType(
            {
                jsonExample: exampleEnumValue.name.wireValue,
                shape: ExampleTypeShape.enum({
                    value: exampleEnumValue.name,
                }),
            }            
        );
    }

    private generateExampleTypeForObject(objectDeclaration: ObjectTypeDeclaration): ExampleType | null { 
        return null;
    }

    private generateExampleTypeForUnion(unionDeclaration: UnionTypeDeclaration): ExampleType | null {
        return null;
    }
    
    private generateExampleTypeForUndiscriminatedUnion(undiscriminatedUnionDeclaration: UndiscriminatedUnionTypeDeclaration): ExampleType | null {
        return null;
    }

    private generateExampleTypeReference(typeReference: TypeReference): ExampleTypeReference | null {
        switch (typeReference.type) {
            case "container":
                return null;
            case "named":
                return null;
            case "primitive":
                return this.generateExamplePrimitive(typeReference.primitive);
            case "unknown":
                return null;
            default:
                assertNever(typeReference);
        }
    }

    private generateExamplePrimitive(primitiveType: PrimitiveType): ExampleTypeReference {
        switch (primitiveType) {
            case "STRING":
                return {
                    jsonExample: "string",
                    shape: ExampleTypeReferenceShape.primitive(
                        ExamplePrimitive.string({ original: "string" }),
                    )
                };
            case "INTEGER":
                return {
                    jsonExample: 0,
                    shape: ExampleTypeReferenceShape.primitive(
                        ExamplePrimitive.integer(0),
                    )
                };
            case "DOUBLE":
                return {
                    jsonExample: 1.0,
                    shape: ExampleTypeReferenceShape.primitive(
                        ExamplePrimitive.double(1.0),
                    )
                };
            case "BOOLEAN":
                return {
                    jsonExample: true,
                    shape: ExampleTypeReferenceShape.primitive(
                        ExamplePrimitive.boolean(true),
                    )
                };
            case "LONG":
                return {
                    jsonExample: 99999,
                    shape: ExampleTypeReferenceShape.primitive(
                        ExamplePrimitive.long(99999),
                    )
                };
            case "DATE_TIME":
                return {
                    jsonExample: "2024-01-01T00:00:00Z",
                    shape: ExampleTypeReferenceShape.primitive(
                        ExamplePrimitive.datetime(new Date("2024-01-01T00:00:00Z")),
                    )
                };
            case "UUID":
                return {
                    jsonExample: "d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32",
                    shape: ExampleTypeReferenceShape.primitive(
                        ExamplePrimitive.uuid("d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32"),
                    )
                };
            case "DATE":
                return {
                    jsonExample: "2024-01-01",
                    shape: ExampleTypeReferenceShape.primitive(
                        ExamplePrimitive.date("2024-01-01"),
                    )
                }; 
            case "BASE_64":
                // TODO(amckinney): Add support for base64 example primitives; use a string for now.
                return {
                    jsonExample: "SGVsbG8gV29ybGQ=",
                    shape: ExampleTypeReferenceShape.primitive(
                        ExamplePrimitive.string({ original: "SGVsbG8gV29ybGQ=" }),
                    )
                };
            default:
                assertNever(primitiveType);
        }
    }

    private newNamelessExampleType({
        jsonExample,
        shape,
    }: {
        jsonExample: unknown;
        shape: ExampleTypeShape;
    }): ExampleType {
        return {
            name: undefined,
            docs: undefined,
            jsonExample,
            shape,
        };
    }
}