import { assertNever } from "@fern-api/core-utils";
import {
    AliasTypeDeclaration, ContainerType, EnumTypeDeclaration, ExampleContainer, ExamplePrimitive, ExampleType,
    ExampleTypeReference,
    ExampleTypeReferenceShape,
    ExampleTypeShape,
    Literal,
    MapType,
    ObjectTypeDeclaration,
    PrimitiveType,
    TypeDeclaration,
    TypeReference,
    UndiscriminatedUnionTypeDeclaration,
    UnionTypeDeclaration
} from "@fern-fern/ir-sdk/api";
import { CasingsGenerator } from "../casings/CasingsGenerator";
import { ExampleResolver } from "../resolvers/ExampleResolver";


export class ExampleGenerator {
    // TODO: These both probably aren't necessary.
    private casingsGenerator: CasingsGenerator;
    private exampleResolver: ExampleResolver;

    constructor(casingsGenerator: CasingsGenerator, exampleResolver: ExampleResolver) {
        this.casingsGenerator = casingsGenerator;
        this.exampleResolver = exampleResolver;
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
        const exampleTypeReference = this.generateExampleTypeReference(aliasDeclaration.aliasOf);
        return this.newNamelessExampleType(
            {
                jsonExample: exampleTypeReference.jsonExample,
                shape: ExampleTypeShape.alias(
                    {
                        value: exampleTypeReference,
                    }
                ),
            }
        );
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

    private generateExampleTypeReference(typeReference: TypeReference): ExampleTypeReference {
        switch (typeReference.type) {
            case "container":
                return this.generateExampleContainer(typeReference.container);
            case "named":
                return null;
            case "primitive":
                return this.generateExamplePrimitive(typeReference.primitive);
            case "unknown":
                return this.generateExampleUnknown();
            default:
                assertNever(typeReference);
        }
    }

    private generateExampleContainer(containerType: ContainerType): ExampleTypeReference {
        switch (containerType.type) {
            case "list":
                return this.generateExampleTypeReferenceList(containerType.list);
            case "map":
                return this.generateExampleTypeReferenceMap(containerType);
            case "optional":
                return this.generateExampleTypeReference(containerType.optional);
            case "set":
                return this.generateExampleTypeReferenceSet(containerType.set);
            case "literal":
                return this.generateExampleTypeReferenceLiteral(containerType.literal);
            default:
                assertNever(containerType);
        }
    }

    private generateExampleTypeReferenceList(typeReference: TypeReference): ExampleTypeReference {
        const exampleTypeReference = this.generateExampleTypeReference(typeReference);
        return {
            jsonExample: [exampleTypeReference.jsonExample],
            shape: ExampleTypeReferenceShape.container(
                ExampleContainer.list([exampleTypeReference]),
            ),
        };
    }

    private generateExampleTypeReferenceMap(mapType: MapType): ExampleTypeReference {
        const exampleTypeReferenceKey = this.generateExampleTypeReference(mapType.keyType);
        const exampleTypeReferenceValue = this.generateExampleTypeReference(mapType.valueType);
        const jsonExampleMapKey = this.jsonExampleToMapKey(exampleTypeReferenceKey.jsonExample);
        return {
            jsonExample: {
                [jsonExampleMapKey]: exampleTypeReferenceValue.jsonExample,
            },
            shape: ExampleTypeReferenceShape.container(
                ExampleContainer.map([{
                    key: exampleTypeReferenceKey,
                    value: exampleTypeReferenceValue,
                }]),
            ),
        };
    }

    private jsonExampleToMapKey(jsonExample: unknown): string | number {
        if (typeof jsonExample === "number") {
            return 42;
        }
        // By default, always return a string key. This prevents unncessary
        // error handling for non-number and non-string map keys which isn't
        // even possible.
        return "string";
    }

    private generateExampleTypeReferenceSet(typeReference: TypeReference): ExampleTypeReference {
        const exampleTypeReference = this.generateExampleTypeReference(typeReference);
        return {
            jsonExample: [exampleTypeReference.jsonExample],
            shape: ExampleTypeReferenceShape.container(
                ExampleContainer.set([exampleTypeReference]),
            ),
        };
    }
    
    private generateExampleTypeReferenceLiteral(literal: Literal): ExampleTypeReference {
        // TODO: Do we need to add support for example literals, or are primitives sufficient here?
        switch (literal.type) {
            case "boolean":
                return {
                    jsonExample: `${literal.boolean}`,
                    shape: ExampleTypeReferenceShape.primitive(
                        ExamplePrimitive.boolean(literal.boolean),
                    ),
                };
            case "string":
                return {
                    jsonExample: `"${literal.string}"`,
                    shape: ExampleTypeReferenceShape.primitive(
                        ExamplePrimitive.string({ original: literal.string }),
                    ),
                };
            default:
                assertNever(literal);
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
                    jsonExample: 42,
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

    private generateExampleUnknown(): ExampleTypeReference {
        return {
            jsonExample: {},
            shape: ExampleTypeReferenceShape.unknown({}),
        };
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