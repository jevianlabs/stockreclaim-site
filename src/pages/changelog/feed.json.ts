import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { site } from "../../site.config";

/**
 * Machine-readable changelog. Single source of truth for the three
 * notification surfaces:
 *   1. this website (the /changelog page),
 *   2. the in-app "What's new" banner inside the Shopify admin,
 *   3. the email announcement.
 *
 * The embedded app fetches this at build time (or on a cron) and ships the
 * latest entry's `banner` line — so a release is written once, here.
 */
export const GET: APIRoute = async ({ site: astroSite }) => {
  const base = (astroSite ?? new URL("https://stockreclaim.com")).origin;
  const entries = (await getCollection("changelog"))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .map((e) => ({
      id: e.slug,
      title: e.data.title,
      date: e.data.date.toISOString().slice(0, 10),
      tag: e.data.tag,
      plan: e.data.plan ?? "All plans",
      // Short merchant-facing line for the banner / email subject.
      banner: e.data.banner ?? e.data.title,
      url: `${base}/changelog/#${e.slug}`,
    }));

  return new Response(
    JSON.stringify({ product: site.name, updated: entries[0]?.date ?? null, entries }, null, 2),
    { headers: { "content-type": "application/json; charset=utf-8", "cache-control": "public, max-age=600" } },
  );
};
