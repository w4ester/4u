import { GeneratorInvocation } from "@fern-api/generators-configuration";
import { TaskContext } from "@fern-api/task-context";
import { Workspace } from "@fern-api/workspace-loader";
import { FernFiddle } from "@fern-fern/fiddle-client";
import { IntermediateRepresentation } from "@fern-fern/ir-model/ir";
import { createAndStartJob } from "./createAndStartJob";
import { pollJobAndReportStatus } from "./pollJobAndReportStatus";

export async function runRemoteGenerationForWorkspace({
    organization,
    workspace,
    intermediateRepresentation,
    context,
    generatorConfigs,
    generatorInvocations,
    version,
}: {
    organization: string;
    workspace: Workspace;
    intermediateRepresentation: IntermediateRepresentation;
    context: TaskContext;
    generatorConfigs: FernFiddle.remoteGen.GeneratorConfigV2[];
    generatorInvocations: GeneratorInvocation[];
    version: string | undefined;
}): Promise<void> {
    if (generatorConfigs.length === 0) {
        context.logger.warn("No generators specified.");
        return;
    }

    const job = await createAndStartJob({
        workspace,
        organization,
        intermediateRepresentation,
        generatorConfigs,
        version,
        context,
    });

    await pollJobAndReportStatus({
        job,
        generatorInvocations,
        context,
    });
}
