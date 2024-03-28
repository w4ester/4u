import { AbsoluteFilePath, join, RelativeFilePath } from "@fern-api/fs-utils";
import { getViolationsForRule } from "../../../testing-utils/getViolationsForRule";
import { ValidPagination } from "../valid-pagination";

describe("valid-pagination", () => {
    it("valid", async () => {
        const violations = await getViolationsForRule({
            rule: ValidPagination,
            absolutePathToWorkspace: join(
                AbsoluteFilePath.of(__dirname),
                RelativeFilePath.of("fixtures"),
                RelativeFilePath.of("valid")
            )
        });
        expect(violations).toEqual([]);
    });
});
