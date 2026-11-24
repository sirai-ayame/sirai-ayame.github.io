import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

const readDeployWorkflow = () =>
  readFile(new URL("../../.github/workflows/deploy.yml", import.meta.url), "utf8");

describe("GitHub Pagesのデプロイワークフロー", () => {
  it("Content Layerのキャッシュを再生成してビルドする", async () => {
    const workflow = await readDeployWorkflow();

    expect(workflow).toContain("build-cmd: npm run build -- --force");
  });
});
