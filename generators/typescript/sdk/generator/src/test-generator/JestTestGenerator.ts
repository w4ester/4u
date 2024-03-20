import * as IR from "@fern-fern/ir-sdk/api";
import { DependencyManager, DependencyType, getTextOfTsNode } from "@fern-typescript/commons";
import { GeneratedSdkClientClass, SdkContext } from "@fern-typescript/contexts";
import { SdkClientClassGenerator } from "@fern-typescript/sdk-client-class-generator";
import path from "path";
import { Directory, ts } from "ts-morph";
import { code, Code } from "ts-poet";

export class JestTestGenerator {
    constructor(
        private intermediateRepresentation: IR.IntermediateRepresentation,
        private dependencyManager: DependencyManager,
        private rootDirectory: Directory,
        private sdkClientClassGenerator: SdkClientClassGenerator
    ) {}

    // private generateServiceTest(
    //     service: IR.HttpService,
    //     serviceGenerator: GeneratedSdkClientClass,
    //     context: SdkContext
    // ): void {
    //     Object.values(this.intermediateRepresentation.services).forEach((service) => {
    //         const fileName = `${service.name.fernFilepath.file?.pascalCase.safeName}.test.ts`;
    //         const serviceGenerator = this.sdkClientClassGenerator.generateService({
    //             packageId: { isRoot: true },
    //             serviceClassName: service.name.fernFilepath.file?.pascalCase.safeName ?? ""
    //         });
    //         const file = this.buildFile(this.intermediateRepresentation, service, serviceGenerator, context);
    //         const sourceFile = this.rootDirectory.createSourceFile(`tests/${fileName}`, file.toString());
    //         sourceFile.saveSync();
    //     });
    // }

    private addJestConfig(): void {
        const jestConfig = this.rootDirectory.createSourceFile(
            "jest.config.js",
            code`
        /** @type {import('ts-jest').JestConfigWithTsJest} */
        module.exports = {
            preset: "ts-jest",
            testEnvironment: "node",
        };
        `.toString()
        );
        jestConfig.saveSync();
    }

    public getTestFile(serviceId: string, service: IR.HttpService): string {
        const serviceName = service.name.fernFilepath.file?.pascalCase.unsafeName;
        const filePath = path.join("tests", serviceId, `${serviceName}.test.ts`);
        return filePath;
    }

    private addDependencies(): void {
        this.dependencyManager.addDependency("jest", "^29.7.0", { type: DependencyType.DEV });
        this.dependencyManager.addDependency("@types/jest", "^29.5.5", { type: DependencyType.DEV });
        this.dependencyManager.addDependency("ts-jest", "^29.1.1", { type: DependencyType.DEV });
    }

    public addExtras(): void {
        this.addJestConfig();
        this.addDependencies();
    }

    public get scripts(): Record<string, string> {
        return {
            test: "jest"
        };
    }

    public buildFile(
        serviceName: string,
        service: IR.HttpService,
        serviceGenerator: GeneratedSdkClientClass,
        context: SdkContext
    ): Code {
        return code`
            import { ${serviceName} } from "../src/${serviceName}";
            const client = new ${serviceName}({
                token: process.env.ENV_TOKEN || "token",
                baseUrl: process.env.TESTS_BASE_URL || "baseUrl",
            })

            describe("${serviceName}", () => {
                ${service.endpoints.map((endpoint) =>
                    this.buildTest(service, endpoint, serviceGenerator, context)?.toString()
                )}
            });
            `;
    }

    private buildTest(
        service: IR.HttpService,
        endpoint: IR.HttpEndpoint,
        serviceGenerator: GeneratedSdkClientClass,
        context: SdkContext
    ): Code | undefined {
        const notSupportedResponse =
            !!endpoint.response &&
            (endpoint.response.type === "streaming" || endpoint.response.type === "fileDownload");
        const notSupportedRequest =
            !!endpoint.requestBody &&
            (endpoint.requestBody.type === "bytes" || endpoint.requestBody.type === "fileUpload");
        const shouldSkip = endpoint.idempotent || notSupportedResponse || notSupportedRequest;
        if (shouldSkip) {
            return;
        }

        const successfulExamples = endpoint.examples.filter((example) => example.response.type === "ok");
        const example = successfulExamples[0];
        if (!example) {
            return;
        }

        const generatedEndpoint = serviceGenerator.getEndpoint({
            endpointId: endpoint.id,
            context
        });
        if (!generatedEndpoint) {
            return;
        }
        const generatedExample = generatedEndpoint.getExample({
            context,
            example,
            opts: {
                isForSnippet: true,
                isForComment: false
            },
            clientReference: ts.factory.createIdentifier("Client")
        });

        console.log("generatedExample", generatedExample);
        if (!generatedExample) {
            return;
        }

        if (example.response.type !== "ok") {
            throw new Error("Only successful responses are supported");
        }

        const getExpectedResponse = () => {
            if (example.response.body?.jsonExample) {
                return example.response.body?.jsonExample;
            }
            // TODO: handle toBeTrue, toBeFalse, toBeNull, toBeUndefined
            return example.response.body?.jsonExample;
        };
        return code`
            test("${endpoint.name.camelCase.unsafeName}", async () => {
                const request = ${getTextOfTsNode(generatedExample)};
                expect(response).toEqual(${getExpectedResponse()});
            });
          `;
    }
}
