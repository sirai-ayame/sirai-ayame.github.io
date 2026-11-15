const SLUG_PATTERN = /^[a-z0-9]+(?:[-_][a-z0-9]+)*$/;

export function validateSlug(slug: string): string {
  if (!SLUG_PATTERN.test(slug)) {
    throw new Error(
      "slug は英小文字・数字を、ハイフンまたはアンダースコアでつないで指定してください。",
    );
  }

  return slug;
}

export function createArticlePath(slug: string): string {
  return `${slug}/index.mdx`;
}

export function createArticleTemplate(title: string, publishedAt: string): string {
  return `---
title: ${JSON.stringify(title)}
description: ""
publishedAt: ${publishedAt}
draft: true
---

ここに本文を書きます。
`;
}
