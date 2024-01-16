import fs from "fs/promises";
import path from "path";
import { AbsoluteFilePath } from "./AbsoluteFilePath";

export async function getAllFilepathsFromDirectory(absoluteFilePath: AbsoluteFilePath): Promise<AbsoluteFilePath[]> {
    const result: AbsoluteFilePath[] = [];
    const items = await fs.readdir(
        absoluteFilePath,
        {
            recursive: true,
            withFileTypes: true,
        },
    );
    await Promise.all(
        items.map(async (item) => {
            if (item.isDirectory()) {
                return;
            }
            result.push(AbsoluteFilePath.of(path.join(absoluteFilePath, item.name)));
        })
    );
    return result;
}