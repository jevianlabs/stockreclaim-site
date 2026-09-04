/**
 * Blog posts come from the app, not from files: the founder writes them in the
 * /admin console and the app publishes them at GET /blog/feed.json (markdown
 * already rendered to HTML). This module fetches that feed at BUILD time — the
 * site is static — and the deploy workflow rebuilds hourly, so a post is live
 * within the hour of being published. If the feed is unreachable the build
 * still succeeds with an empty blog rather than failing the whole site.
 */
export interface Post {
  slug: string;
  title: string;
  summary: string;
  tag: string | null;
  publishedAt: string;
  updatedAt: string;
  html: string;
}

const FEED_URL =
  import.meta.env.BLOG_FEED_URL ||
  process.env.BLOG_FEED_URL ||
  "https://restock-radar-prod.fly.dev/blog/feed.json";

let cache: Promise<Post[]> | null = null;

export function getPosts(): Promise<Post[]> {
  if (!cache) cache = load();
  return cache;
}

async function load(): Promise<Post[]> {
  try {
    const res = await fetch(FEED_URL, { signal: AbortSignal.timeout(15_000) });
    if (!res.ok) throw new Error(`feed responded ${res.status}`);
    const json = (await res.json()) as { posts?: unknown };
    const posts = Array.isArray(json.posts) ? (json.posts as Post[]) : [];
    const valid = posts.filter(
      (p) => p && typeof p.slug === "string" && typeof p.title === "string" && typeof p.html === "string",
    );
    valid.sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
    console.log(`[blog] ${valid.length} post(s) from ${FEED_URL}`);
    return valid;
  } catch (err) {
    console.warn(`[blog] feed unavailable (${String(err)}) — building with no posts`);
    return [];
  }
}

/** "12 Aug 2026" — the brand's date form. */
export function fmtDate(iso: string): string {
  const t = Date.parse(iso);
  if (!Number.isFinite(t)) return "";
  return new Date(t).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}
