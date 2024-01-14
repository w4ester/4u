import { ExampleType, TypeDeclaration } from "@fern-fern/ir-sdk/api";

export class ExampleGenerator {
    public generateExampleType(typeDeclaration: TypeDeclaration): ExampleType {
        return {
            name: undefined,
            shape: {},
        };
    }
}