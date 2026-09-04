import { defineCollection, z } from "astro:content";

/**
 * Help center articles. Plain markdown in src/content/help/*.md.
 * `order` controls position within a category; lower shows first.
 */
const help = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    category: z.enum([
      "Getting started",
      "How the audit works",
      "Plans & billing",
      "Data & privacy",
    ]),
    order: z.number().default(100),
    updated: z.coerce.date(),
  }),
});

/**
 * Public changelog — the "notifications" surface on the website. One markdown
 * file per release. `tag` colours the entry; `banner` (optional) is the short
 * line the in-app banner and email announcement reuse, so keep it under ~90
 * chars and merchant-facing.
 */
const changelog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tag: z.enum(["New", "Improved", "Fixed"]).default("New"),
    plan: z.enum(["All plans", "Starter", "Growth"]).optional(),
    banner: z.string().optional(),
  }),
});

export const collections = { help, changelog };
