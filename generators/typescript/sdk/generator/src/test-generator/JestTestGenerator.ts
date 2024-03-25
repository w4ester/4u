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
        const tests = service.endpoints
            .map((endpoint) => {
                return this.buildTest(service, endpoint, serviceGenerator, context);
            })
            .filter(Boolean);

        const fallbackTest = code`
            test("constructor", () => {
                expect(client).toBeInstanceOf(${serviceName});
            });
        `;

        return code`
            import { ${serviceName} } from "../src/${serviceName}";
            const client = new ${serviceName}({
                token: process.env.ENV_TOKEN || "token",
                baseUrl: process.env.TESTS_BASE_URL || "baseUrl",
            })

            describe("${serviceName}", () => {
                ${tests.length > 0 ? tests : fallbackTest}
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
            clientReference: ts.factory.createIdentifier("client")
        });

        if (!generatedExample) {
            return;
        }

        if (example.response.type !== "ok") {
            throw new Error("Only successful responses are supported");
        }

        const getExpectedResponse = () => {
            const body = example.response.body;
            if (!body) {
                return code`undefined`;
            }

            return body.shape._visit({
                primitive: (value) => {
                    return value._visit({
                        integer: (value) => code`${value}`,
                        double: (value) => code`${value}`,
                        string: (value) => code`"${value.original}"`,
                        boolean: (value) => code`${value}`,
                        long: (value) => code`${value}`,
                        datetime: (value) => code`new Date(${value.toISOString()})`,
                        date: (value) => code`new Date(${value})`,
                        uuid: (value) => code`${value}`,
                        _other: (value) => code`${value}`
                    });
                },
                container: (value) => {
                    return body.jsonExample;
                },
                named: (value) => {
                    return body.jsonExample;
                },
                unknown: (value) => {
                    return body.jsonExample;
                },
                _other: (value) => {
                    return body.jsonExample;
                }
            });
        };
        return code`
            test("${endpoint.name.camelCase.unsafeName}", async () => {
                const response = ${getTextOfTsNode(generatedExample)};
                expect(response).toEqual(${getExpectedResponse()});
            });
          `;
    }
}
