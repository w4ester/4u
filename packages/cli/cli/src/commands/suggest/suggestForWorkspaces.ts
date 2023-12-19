import { Project } from "@fern-api/project-loader";
import { TaskContext } from "@fern-api/task-context";
import { convertOpenApiWorkspaceToFernWorkspace } from "@fern-api/workspace-loader";
import {
    ContainerType,
    HttpEndpoint,
    HttpRequestBody,
    HttpResponse,
    IntermediateRepresentation,
    ServiceId,
    TypeId,
    TypeReference
} from "@fern-fern/ir-sdk/api";
import { CliContext } from "../../cli-context/CliContext";
import { generateIrForFernWorkspace } from "../generate-ir/generateIrForFernWorkspace";

export async function suggestForWorkspaces({
    project,
    cliContext
}: {
    project: Project;
    cliContext: CliContext;
}): Promise<void> {
    await Promise.all(
        project.apiWorkspaces.map(async (workspace) => {
            await cliContext.runTaskForWorkspace(workspace, async (context) => {
                if (workspace.type !== "openapi") {
                    return;
                }
                const fernWorkspace = await convertOpenApiWorkspaceToFernWorkspace(workspace, context);
                const ir = await generateIrForFernWorkspace({
                    workspace: fernWorkspace,
                    context,
                    generationLanguage: undefined,
                    audiences: {
                        type: "all"
                    }
                });
                await suggestImprovements({ ir, context });
            });
        })
    );
}

async function suggestImprovements({ ir, context }: { ir: IntermediateRepresentation; context: TaskContext }) {
    const rootPackageTypeIDs = new Set(ir.rootPackage.types);
    const typeIdToSubpackageCandidate: Record<TypeId, Set<ServiceId>> = {};

    for (const [serviceId, service] of Object.entries(ir.services)) {
        for (const [_, endpoint] of Object.entries(service.endpoints)) {
            const typeIds: TypeId[] = getTypeIdsForEndpoint({ endpoint });
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            for (const typeId of typeIds) {
                if (!rootPackageTypeIDs.has(typeId)) {
                    continue;
                }
                if (typeIdToSubpackageCandidate[typeId] == null) {
                    typeIdToSubpackageCandidate[typeId] = new Set([serviceId]);
                } else {
                    typeIdToSubpackageCandidate[typeId]?.add(serviceId);
                }
            }
        }
    }

    const typeIdToRecommendedSubpackageId: Record<TypeId, ServiceId> = {};

    for (const [typeId, serviceIds] of Object.entries(typeIdToSubpackageCandidate)) {
        const serviceId = serviceIds.values().next().value;
        if (serviceIds.size > 1 && serviceId != null) {
            continue;
        }
        typeIdToRecommendedSubpackageId[typeId] = serviceId;

        // add any referenced types that are also in the root package
        // and don't have a recommended subpackage id
        const declaration = ir.types[typeId];
        if (declaration == null) {
            continue;
        }
        for (const referencedType of declaration.referencedTypes) {
            if (rootPackageTypeIDs.has(referencedType) && !(referencedType in typeIdToSubpackageCandidate)) {
                typeIdToRecommendedSubpackageId[referencedType] = serviceId;
            }
        }
    }

    const overrides: Record<string, object> = {};

    for (const [typeId, serviceId] of Object.entries(typeIdToRecommendedSubpackageId)) {
        const type = ir.types[typeId];
        const service = ir.services[serviceId];

        if (type == null || service == null) {
            continue;
        }

        overrides[type.name.name.originalName] = {
            "x-fern-sdk-group-name": service.name.fernFilepath.file?.camelCase.unsafeName
        };
    }

    context.logger.info("Move the following types: ", JSON.stringify(overrides, undefined, 2));
}

function getTypeIdsForEndpoint({ endpoint }: { endpoint: HttpEndpoint }): TypeId[] {
    return [
        ...endpoint.allPathParameters.flatMap((pathParam) =>
            getTypeIdsFromTypeReference({ typeReference: pathParam.valueType })
        ),
        ...endpoint.queryParameters.flatMap((queryParam) =>
            getTypeIdsFromTypeReference({ typeReference: queryParam.valueType })
        ),
        ...endpoint.headers.flatMap((header) => getTypeIdsFromTypeReference({ typeReference: header.valueType })),
        ...(endpoint.requestBody != null ? getTypeIdsFromRequest({ request: endpoint.requestBody }) : []),
        ...(endpoint.response != null ? getTypeIdsFromResponse({ response: endpoint.response }) : [])
    ];
}

function getTypeIdsFromRequest({ request }: { request: HttpRequestBody }): TypeId[] {
    return request._visit<TypeId[]>({
        bytes: () => [],
        fileUpload: (fileUploadRequest) => {
            const typeIds = [];
            for (const prop of fileUploadRequest.properties) {
                if (prop.type === "bodyProperty") {
                    typeIds.push(...getTypeIdsFromTypeReference({ typeReference: prop.valueType }));
                }
            }
            return typeIds;
        },
        inlinedRequestBody: (inlinedRequestBody) => {
            const typeIds = [];
            for (const prop of inlinedRequestBody.properties) {
                typeIds.push(...getTypeIdsFromTypeReference({ typeReference: prop.valueType }));
            }
            return typeIds;
        },
        reference: (reference) => getTypeIdsFromTypeReference({ typeReference: reference.requestBodyType }),
        _other: () => []
    });
}

function getTypeIdsFromResponse({ response }: { response: HttpResponse }): TypeId[] {
    return response._visit<TypeId[]>({
        fileDownload: () => [],
        text: () => [],
        streaming: () => [],
        json: (json) => getTypeIdsFromTypeReference({ typeReference: json.responseBodyType }),
        _other: () => []
    });
}

function getTypeIdsFromTypeReference({ typeReference }: { typeReference: TypeReference }): TypeId[] {
    return typeReference._visit<TypeId[]>({
        container: (containerType) => getTypeIdsFromContainer({ containerType }),
        named: (named) => [named.typeId],
        primitive: () => [],
        unknown: () => [],
        _other: () => []
    });
}

function getTypeIdsFromContainer({ containerType }: { containerType: ContainerType }): TypeId[] {
    return containerType._visit<TypeId[]>({
        list: (listType) => getTypeIdsFromTypeReference({ typeReference: listType }),
        set: (setType) => getTypeIdsFromTypeReference({ typeReference: setType }),
        map: (mapType) => [
            ...getTypeIdsFromTypeReference({ typeReference: mapType.keyType }),
            ...getTypeIdsFromTypeReference({ typeReference: mapType.valueType })
        ],
        optional: (optionalType) => getTypeIdsFromTypeReference({ typeReference: optionalType }),
        literal: () => [],
        _other: () => []
    });
}
