import { describe, expect, it } from "vitest";
import { createArticleTemplate, validateSlug } from "./article-template";

describe("validateSlug", () => {
  it.each(["first-post", "walk-2026", "mountain_trip"])('%s を受け入れる', (slug) => {
    expect(validateSlug(slug)).toBe(slug);
  });

  it.each(["", "../secret", "日本語", "UPPERCASE", "two words", "/absolute"])(
    "%s を拒否する",
    (slug) => {
      expect(() => validateSlug(slug)).toThrow("slug");
    },
  );
});

describe("createArticleTemplate", () => {
  it("下書き状態のMDX frontmatterを生成する", () => {
    expect(createArticleTemplate("記事タイトル", "2026-11-15")).toBe(`---
title: "記事タイトル"
description: ""
publishedAt: 2026-11-15
draft: true
---

ここに本文を書きます。
`);
  });

  it("YAMLで意味を持つ文字をエスケープする", () => {
    expect(createArticleTemplate('引用 "テスト"', "2026-11-15")).toContain(
      'title: "引用 \\"テスト\\""',
    );
  });
});
