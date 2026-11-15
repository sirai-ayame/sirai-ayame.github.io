import { describe, expect, it } from "vitest";
import { getPublishedPosts, type PostSummary } from "./posts";

const post = (
  id: string,
  publishedAt: string,
  draft = false,
): PostSummary => ({
  id,
  data: {
    title: id,
    description: `${id} description`,
    publishedAt: new Date(publishedAt),
    draft,
  },
});

describe("getPublishedPosts", () => {
  it("公開日の新しい順で公開記事だけを返す", () => {
    const posts = [
      post("older", "2026-01-01"),
      post("draft", "2026-03-01", true),
      post("newer", "2026-02-01"),
    ];

    expect(getPublishedPosts(posts).map(({ id }) => id)).toEqual([
      "newer",
      "older",
    ]);
  });

  it("開発時は下書きを含められる", () => {
    const posts = [post("published", "2026-01-01"), post("draft", "2026-02-01", true)];

    expect(getPublishedPosts(posts, true).map(({ id }) => id)).toEqual([
      "draft",
      "published",
    ]);
  });

  it("入力配列を変更しない", () => {
    const posts = [post("older", "2026-01-01"), post("newer", "2026-02-01")];

    getPublishedPosts(posts);

    expect(posts.map(({ id }) => id)).toEqual(["older", "newer"]);
  });
});
