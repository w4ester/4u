import * as IR from "@fern-fern/ir-sdk/api";
import {
    DependencyManager,
    DependencyType,
    ExportedFilePath,
    getTextOfTsNode,
    PackageId
} from "@fern-typescript/commons";
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
            /** @type {import('jest').Config} */
            module.exports = {
                preset: "ts-jest",
                testEnvironment: "node",
                globalSetup: "<rootDir>/tests/setup.js",
                globalTeardown: "<rootDir>/tests/teardown.js",
            };
            `.toString({ dprintOptions: { indentWidth: 4 } })
        );
        jestConfig.saveSync();

        const setupFile = this.rootDirectory.createSourceFile(
            "tests/setup.js",
            code`
            const { setup: setupDevServer } = require("jest-dev-server");

            const PORT = 56157;


            module.exports = async function globalSetup() {
                process.env.TESTS_BASE_URL = \`http://localhost:\${PORT}\`;

                globalThis.servers = await setupDevServer({
                    command: \`node config/start.js --port=\${PORT}\`,
                    launchTimeout: 10_000,
                    port: PORT,
                });
            };`.toString({ dprintOptions: { indentWidth: 4 } })
        );
        setupFile.saveSync();
        const teardownFile = this.rootDirectory.createSourceFile(
            "tests/teardown.js",
            code`
            const { teardown: teardownDevServer } = require("jest-dev-server");

            module.exports = async function globalSetup() {
                await teardownDevServer(globalThis.servers);
            };`.toString({ dprintOptions: { indentWidth: 4 } })
        );
        teardownFile.saveSync();
    }

    public getTestFile(serviceId: string, service: IR.HttpService): ExportedFilePath {
        const serviceName = service.name.fernFilepath.file?.pascalCase.unsafeName ?? "main";
        const filePath = path.join(serviceId, `${serviceName}.test.ts`);
        return {
            directories: [],
            file: {
                nameOnDisk: filePath
            },
            rootDir: "tests"
        };
    }

    private addDependencies(): void {
        this.dependencyManager.addDependency("jest", "^29.7.0", { type: DependencyType.DEV });
        this.dependencyManager.addDependency("@types/jest", "^29.5.5", { type: DependencyType.DEV });
        this.dependencyManager.addDependency("ts-jest", "^29.1.1", { type: DependencyType.DEV });
        this.dependencyManager.addDependency("jest-dev-server", "^10.0.0", { type: DependencyType.DEV });
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
        packageId: PackageId,
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
                expect(${getTextOfTsNode(
                    serviceGenerator.accessFromRootClient({
                        referenceToRootClient: ts.factory.createIdentifier("client")
                    })
                )}).toBeDefined();
            });
        `;

        const importStatement = context.sdkClientClass.getReferenceToClientClass({ isRoot: true });

        return code`
            const client = new ${getTextOfTsNode(importStatement.getEntityName())}({
                token: process.env.ENV_TOKEN,
                environment: process.env.TESTS_BASE_URL || "test",
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

            const visitShape: IR.ExampleTypeReferenceShape._Visitor<Code | unknown> = {
                primitive: (value) => {
                    return value._visit({
                        integer: (value) => code`${value}`,
                        double: (value) => code`${value}`,
                        string: (value) => code`"${value.original}"`,
                        boolean: (value) => code`${value}`,
                        long: (value) => code`${value}`,
                        datetime: (value) => code`new Date(${value.toISOString()})`,
                        date: (value) => code`new Date(${value})`,
                        uuid: (value) => code`"${value}"`,
                        _other: (value) => code`${value}`
                    });
                },
                container: (value) => {
                    return body.jsonExample;
                },
                named: (value) => {
                    return value.shape._visit({
                        alias: (value) => {
                            return code`${value.value.shape._visit(visitShape)}`;
                        },
                        enum: (value) => {
                            return code`${value.value.wireValue}`;
                        },
                        object: (value) => {
                            return code`${body.jsonExample}`;
                        },
                        union: (value) => {
                            return code`${body.jsonExample}`;
                        },
                        undiscriminatedUnion: (value) => {
                            return code`${body.jsonExample}`;
                        },
                        _other: (value: { type: string }) => {
                            return body.jsonExample;
                        }
                    });
                },
                unknown: (value) => {
                    return body.jsonExample;
                },
                _other: (value) => {
                    return body.jsonExample;
                }
            };

            return body.shape._visit(visitShape);
        };
        return code`
            test("${endpoint.name.camelCase.unsafeName}", async () => {
                const response = ${getTextOfTsNode(generatedExample)};
                expect(response).toEqual(${getExpectedResponse()});
            });
          `;
    }
}
