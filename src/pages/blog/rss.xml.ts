import type { APIRoute } from "astro";
import { getPosts } from "../../lib/blog";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** /blog/rss.xml — RSS 2.0 for the blog. Built from the same feed the pages use. */
export const GET: APIRoute = async ({ site }) => {
  const origin = (site?.href ?? "https://stockreclaim.com/").replace(/\/$/, "");
  const posts = await getPosts();
  const items = posts
    .map(
      (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${origin}/blog/${p.slug}/</link>
      <guid isPermaLink="true">${origin}/blog/${p.slug}/</guid>
      <pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate>
      <description>${esc(p.summary)}</description>
    </item>`,
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>StockReclaim blog</title>
    <link>${origin}/blog/</link>
    <description>Plain writing on returns, restocking and the money that leaks between them.</description>
    <language>en</language>
    <atom:link href="${origin}/blog/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
};
