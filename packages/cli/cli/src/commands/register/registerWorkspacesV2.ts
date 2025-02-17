import { FernToken } from "@fern-api/auth";
import { Project } from "@fern-api/project-loader";
import { registerApi } from "@fern-api/register";
import chalk from "chalk";
import { CliContext } from "../../cli-context/CliContext";

export async function registerWorkspacesV2({
    project,
    cliContext,
    token
}: {
    project: Project;
    cliContext: CliContext;
    token: FernToken;
}): Promise<void> {
    await Promise.all(
        project.apiWorkspaces.map(async (workspace) => {
            await cliContext.runTaskForWorkspace(workspace, async (context) => {
                if (workspace.type === "oss") {
                    context.failWithoutThrowing("Cannot register OpenAPI workspace");
                } else {
                    await registerApi({
                        organization: project.config.organization,
                        workspace,
                        context,
                        token,
                        audiences: { type: "all" },
                        snippetsConfig: {},
                        navigation: undefined
                    });
                    context.logger.info(chalk.green("Registered API"));
                }
            });
        })
    );
}
