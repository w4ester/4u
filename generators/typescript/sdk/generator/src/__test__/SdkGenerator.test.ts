/* eslint-disable jest/no-mocks-import */
import { Project } from "ts-morph";
import { SdkGenerator } from "../SdkGenerator";
import { IrLoader, IrPaths } from "./__mocks__/IrLoader";
import { Mocks } from "./__mocks__/Mocks";

require("jest-specific-snapshot");

let generator: SdkGenerator;

async function generatorWithIr(ir: keyof typeof IrPaths) {
    return new SdkGenerator({
        namespaceExport: "TestSdk",
        intermediateRepresentation: await IrLoader.load(ir),
        context: Mocks.generatorContext(),
        npmPackage: Mocks.npmPackage(),
        generateJestTests: true,
        config: Mocks.sdkConfig()
    });
}

function concatFiles(project: Project) {
    const sortedFiles = project.getSourceFiles().sort((a, b) => a.getFilePath().localeCompare(b.getFilePath()));
    const files = sortedFiles
        .map((file) => {
            const filePath = file.getFilePath();
            const source = file.getFullText();
            return `/// File: ${filePath}\n${source}`;
        })
        .join("\n\n");
    return files;
}

describe("SdkGenerator", () => {
    it("should generate for multi-url-environment", async () => {
        generator = await generatorWithIr("MULTI_URL_ENVIRONMENT");
        const project = await generator.generate();
        expect(project).toBeDefined();

        expect(concatFiles(project.tsMorphProject)).toMatchSpecificSnapshot("__snapshots__/multi-url-environment.txt");
    });

    it("should generate for examples", async () => {
        generator = await generatorWithIr("EXAMPLES");
        const project = await generator.generate();
        expect(project).toBeDefined();

        expect(concatFiles(project.tsMorphProject)).toMatchSpecificSnapshot("__snapshots__/examples.txt");
    });
});
