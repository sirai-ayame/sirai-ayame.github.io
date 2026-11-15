export type PostSummary = {
  id: string;
  data: {
    title: string;
    description: string;
    publishedAt: Date;
    draft: boolean;
  };
};

export function getPublishedPosts<T extends PostSummary>(
  posts: T[],
  includeDrafts = false,
): T[] {
  return posts
    .filter((post) => includeDrafts || !post.data.draft)
    .toSorted(
      (left, right) =>
        right.data.publishedAt.getTime() - left.data.publishedAt.getTime(),
    );
}
