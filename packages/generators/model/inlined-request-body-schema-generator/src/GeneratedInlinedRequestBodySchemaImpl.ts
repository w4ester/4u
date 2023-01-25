import { HttpEndpoint, HttpService, InlinedRequestBody } from "@fern-fern/ir-model/http";
import { AbstractGeneratedSchema } from "@fern-typescript/abstract-schema-generator";
import { getTextOfTsNode, Reference, Zurg } from "@fern-typescript/commons";
import { GeneratedInlinedRequestBodySchema, InlinedRequestBodySchemaContext } from "@fern-typescript/contexts";
import { ModuleDeclaration, ts } from "ts-morph";

export declare namespace GeneratedInlinedRequestBodySchemaImpl {
    export interface Init extends AbstractGeneratedSchema.Init {
        service: HttpService;
        endpoint: HttpEndpoint;
        inlinedRequestBody: InlinedRequestBody;
    }
}

export class GeneratedInlinedRequestBodySchemaImpl
    extends AbstractGeneratedSchema<InlinedRequestBodySchemaContext>
    implements GeneratedInlinedRequestBodySchema
{
    private service: HttpService;
    private endpoint: HttpEndpoint;
    private inlinedRequestBody: InlinedRequestBody;

    constructor({ service, endpoint, inlinedRequestBody, ...superInit }: GeneratedInlinedRequestBodySchemaImpl.Init) {
        super(superInit);
        this.service = service;
        this.endpoint = endpoint;
        this.inlinedRequestBody = inlinedRequestBody;
    }

    public writeToFile(context: InlinedRequestBodySchemaContext): void {
        this.writeSchemaToFile(context);
    }

    public serializeRequest(
        referenceToParsedRequest: ts.Expression,
        context: InlinedRequestBodySchemaContext
    ): ts.Expression {
        return this.getReferenceToZurgSchema(context).json(referenceToParsedRequest);
    }

    protected getReferenceToSchema(context: InlinedRequestBodySchemaContext): Reference {
        return context.inlinedRequestBodySchema.getReferenceToInlinedRequestBodySchema(
            this.service.name.fernFilepath,
            this.endpoint.name
        );
    }

    protected generateRawTypeDeclaration(context: InlinedRequestBodySchemaContext, module: ModuleDeclaration): void {
        module.addInterface({
            name: AbstractGeneratedSchema.RAW_TYPE_NAME,
            properties: this.inlinedRequestBody.properties.map((property) => {
                const type = context.typeSchema.getReferenceToRawType(property.valueType);
                return {
                    name: `"${property.name.wireValue}"`,
                    type: getTextOfTsNode(type.typeNodeWithoutUndefined),
                    hasQuestionToken: type.isOptional,
                };
            }),
            extends: this.inlinedRequestBody.extends.map((extension) =>
                getTextOfTsNode(context.typeSchema.getReferenceToRawNamedType(extension).getTypeNode())
            ),
        });
    }

    protected getReferenceToParsedShape(context: InlinedRequestBodySchemaContext): ts.TypeNode {
        const referenceToRequestWrapper = context.requestWrapper.getReferenceToRequestWrapper(
            this.service.name.fernFilepath,
            this.endpoint.name
        );
        const generatedRequestWrapper = context.requestWrapper.getGeneratedRequestWrapper(
            this.service.name.fernFilepath,
            this.endpoint.name
        );
        const nonBodyKeys = generatedRequestWrapper.getNonBodyKeys();
        if (nonBodyKeys.length === 0) {
            return referenceToRequestWrapper;
        } else {
            return ts.factory.createTypeReferenceNode(ts.factory.createIdentifier("Omit"), [
                referenceToRequestWrapper,
                ts.factory.createUnionTypeNode(
                    nonBodyKeys.map((nonBodyKey) =>
                        ts.factory.createLiteralTypeNode(ts.factory.createStringLiteral(nonBodyKey))
                    )
                ),
            ]);
        }
    }

    protected buildSchema(context: InlinedRequestBodySchemaContext): Zurg.Schema {
        let schema = context.base.coreUtilities.zurg.object(
            this.inlinedRequestBody.properties.map((property) => ({
                key: {
                    parsed: context.requestWrapper
                        .getGeneratedRequestWrapper(this.service.name.fernFilepath, this.endpoint.name)
                        .getInlinedRequestBodyPropertyKey(property),
                    raw: property.name.wireValue,
                },
                value: context.typeSchema.getSchemaOfTypeReference(property.valueType),
            }))
        );

        for (const extension of this.inlinedRequestBody.extends) {
            schema = schema.extend(context.typeSchema.getSchemaOfNamedType(extension, { isGeneratingSchema: true }));
        }

        return schema;
    }
}
