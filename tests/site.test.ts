import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

const readOutput = (path: string) => readFile(new URL(`../dist/${path}`, import.meta.url), "utf8");

describe("生成されたサイト", () => {
  it("ルートからブログトップへ誘導する", async () => {
    const html = await readOutput("index.html");

    expect(html).toContain('http-equiv="refresh" content="0;url=/blog"');
    expect(html).toContain('href="/blog"');
  });

  it("ブログ一覧から公開記事へ移動できる", async () => {
    const html = await readOutput("blog/index.html");

    expect(html).toContain('href="/blog/hello/"');
    expect(html).toContain("はじめまして");
    expect(html).not.toContain("下書き");
  });

  it("記事に検索・共有用メタデータを出力する", async () => {
    const html = await readOutput("blog/hello/index.html");

    expect(html).toContain('rel="canonical" href="https://sirai-ayame.github.io/blog/hello/"');
    expect(html).toContain('property="og:type" content="article"');
    expect(html).toContain('property="article:published_time"');
  });

  it("404ページを検索対象外にして復帰導線を表示する", async () => {
    const html = await readOutput("404.html");

    expect(html).toContain('name="robots" content="noindex"');
    expect(html).toContain('href="/blog"');
  });

  it("公開記事をRSSとサイトマップへ掲載する", async () => {
    const [rss, sitemap] = await Promise.all([
      readOutput("rss.xml"),
      readOutput("sitemap-0.xml"),
    ]);

    expect(rss).toContain("https://sirai-ayame.github.io/blog/hello/");
    expect(sitemap).toContain("https://sirai-ayame.github.io/blog/hello/");
    expect(sitemap).not.toContain("/404");
  });
});
