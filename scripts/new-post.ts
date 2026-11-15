import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  createArticlePath,
  createArticleTemplate,
  validateSlug,
} from "../src/lib/article-template.ts";

const [, , slugArgument, ...titleParts] = process.argv;
const title = titleParts.join(" ").trim();

if (!slugArgument || !title) {
  console.error('使い方: npm run new:post -- <slug> "記事タイトル"');
  process.exitCode = 1;
} else {
  try {
    const slug = validateSlug(slugArgument);
    const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
    const articlesDirectory = resolve(repositoryRoot, "src/content/blog");
    const articlePath = resolve(articlesDirectory, createArticlePath(slug));
    const publishedAt = new Intl.DateTimeFormat("sv-SE", {
      timeZone: "Asia/Tokyo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());

    await mkdir(dirname(articlePath), { recursive: true });
    await writeFile(
      articlePath,
      createArticleTemplate(title, publishedAt),
      { encoding: "utf8", flag: "wx" },
    );
    console.log(`下書きを作成しました: ${articlePath}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`記事を作成できませんでした: ${message}`);
    process.exitCode = 1;
  }
}
