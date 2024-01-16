import SwaggerParser from "@apidevtools/swagger-parser";
import { AbsoluteFilePath, dirname, getAllFilepathsFromDirectory, join, RelativeFilePath } from "@fern-api/fs-utils";
import { TaskContext } from "@fern-api/task-context";
import { bundle, Config } from "@redocly/openapi-core";
import { Plugin } from "@redocly/openapi-core/lib/config";
import { NodeType } from "@redocly/openapi-core/lib/types";
import fs, { readFile } from "fs/promises";
import yaml from "js-yaml";
import { merge } from "lodash-es";
import { OpenAPI } from "openapi-types";
import { FernOpenAPIExtension } from "./v3/extensions/fernExtensions";

const XFernStreaming: NodeType = {
    properties: {
        "stream-condition": { type: "string" },
        response: "Schema",
        "response-stream": "Schema"
    },
    required: ["stream-condition", "response", "response-stream"],
    extensionsPrefix: "x-"
};

const FERN_TYPE_EXTENSIONS: Plugin = {
    id: "",
    typeExtension: {
        oas3: (types) => {
            return {
                ...types,
                XFernStreaming,
                Operation: {
                    ...types.Operation,
                    properties: {
                        ...types.Operation?.properties,
                        "x-fern-streaming": "XFernStreaming"
                    }
                }
            };
        }
    }
};

const CONFIG: Config = new Config(
    {
        apis: {},
        styleguide: {
            plugins: [FERN_TYPE_EXTENSIONS],
            rules: {
                spec: "warn"
            }
        }
    },
    undefined
);

export async function loadOpenAPI({
    absolutePathToOpenAPI,
    absolutePathToOpenAPIOverrides,
    context
}: {
    absolutePathToOpenAPI: AbsoluteFilePath;
    absolutePathToOpenAPIOverrides: AbsoluteFilePath | undefined;
    context: TaskContext;
}): Promise<OpenAPI.Document> {
    const parsed = parseAbsoluteFilePathAsOpenAPI(absolutePathToOpenAPI);

    let overridesFilepath = undefined;
    if (absolutePathToOpenAPIOverrides != null) {
        overridesFilepath = absolutePathToOpenAPIOverrides;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } else if (typeof parsed === "object" && (parsed as any)[FernOpenAPIExtension.OPENAPI_OVERIDES_FILEPATH] != null) {
        overridesFilepath = join(
            dirname(absolutePathToOpenAPI),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            RelativeFilePath.of((parsed as any)[FernOpenAPIExtension.OPENAPI_OVERIDES_FILEPATH])
        );
    }

    if (overridesFilepath != null) {
        let parsedOverrides = null;
        try {
            const contents = (await readFile(overridesFilepath, "utf8")).toString();
            try {
                parsedOverrides = JSON.parse(contents);
            } catch (err) {
                parsedOverrides = yaml.load(contents, { json: true });
            }
        } catch (err) {
            return context.failAndThrow(`Failed to read OpenAPI overrides from file ${overridesFilepath}`);
        }
        const merged = merge({}, parsed, parsedOverrides) as OpenAPI.Document;
        return merged;
    }
    return parsed;
}

async function parseAbsoluteFilePathAsOpenAPI(absolutePathToOpenAPI: AbsoluteFilePath): Promise<OpenAPI.Document> {
    if  (!(await fs.stat(absolutePathToOpenAPI)).isDirectory()) {
        return await parseOpenAPI(absolutePathToOpenAPI);
    }

    // Note: Reducing in reverse order is important here. The first file
    // in the openapi directory will be merged last so that its info section
    // (if any) is used.
    const openAPIFiles = await getAllFilepathsFromDirectory(absolutePathToOpenAPI);
    openAPIFiles.reverse();

    // TODO: Clean all this up with a reduce like the following:
    // return openAPIFiles.reverse().reduce(async (acc, openAPIFile) => {
    //     const parsed = await parseOpenAPI(openAPIFile);
    //     return merge({}, acc, parsed) as OpenAPI.Document;
    // }, Promise.resolve({} as OpenAPI.Document));

    const openAPIFile = openAPIFiles[0];
    if (openAPIFile == null) {
        // TODO: None of this validation should be necessary.
        throw new Error("internal error: failed to read OpenAPI files from directory");
    }
    let merged = await parseOpenAPI(openAPIFile);
    for (let i = 1; i < openAPIFiles.length; i++) {
        const openAPIFile = openAPIFiles[i];
        if (openAPIFile == null) {
            // TODO: None of this validation should be necessary.
            throw new Error("internal error: failed to read OpenAPI files from directory");
        }
        const parsed = await parseOpenAPI(openAPIFile);
        merged = merge(merged, parsed) as OpenAPI.Document;
    }
    return merged;
}

async function parseOpenAPI(absolutePathToOpenAPI: AbsoluteFilePath): Promise<OpenAPI.Document> {
    const result = await bundle({
        config: CONFIG,
        ref: absolutePathToOpenAPI,
        dereference: false,
        removeUnusedComponents: false,
        keepUrlRefs: true
    });
    return await SwaggerParser.parse(result.bundle.parsed);
}