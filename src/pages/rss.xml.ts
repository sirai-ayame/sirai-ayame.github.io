import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";
import { getPublishedPosts } from "../lib/posts";

export async function GET(context: APIContext) {
  const posts = getPublishedPosts(await getCollection("blog"));

  return rss({
    title: "紫蕾アヤメのブログ",
    description: "登山、散歩、技術、日々のことを記録するブログです。",
    site: context.site ?? "https://sirai-ayame.github.io",
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedAt,
      link: `/blog/${post.id}/`,
    })),
  });
}
