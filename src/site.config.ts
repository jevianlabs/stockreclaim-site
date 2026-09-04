/**
 * Site-wide constants. The one place to change links, contact and the
 * feature-request board so nothing is hard-coded across pages.
 */
export const site = {
  name: "StockReclaim",
  // 100-char listing description, verbatim from the brand guide.
  tagline: "Find refunded items that never made it back to your shelf, and what they cost you.",
  // The Shopify App Store listing. Fill in once the app is listed; until then
  // the install CTAs point at the waitlist.
  appStoreUrl: "", // e.g. "https://apps.shopify.com/stockreclaim"
  // Where "Request a free scan" / "Join the waitlist" goes pre-launch.
  waitlistUrl: "mailto:hello@stockreclaim.com?subject=StockReclaim%20free%20scan",
  supportEmail: "support@stockreclaim.com",
  helloEmail: "hello@stockreclaim.com",
  // Feature-request board (hybrid decision: use a proven tool, don't build one).
  // Set ONE of these. Featurebase is the recommended default (free tier, embed +
  // hosted portal). Fider is the open-source self-host alternative.
  featureBoard: {
    // The hosted portal URL merchants visit, e.g. "https://stockreclaim.featurebase.app".
    portalUrl: "",
    // Featurebase embed org (the subdomain slug) — enables the inline widget.
    // Leave "" to just link out to portalUrl instead of embedding.
    featurebaseOrg: "",
  },
} as const;

/** Primary nav shown in the header and footer. */
export const nav = [
  { label: "Pricing", href: "/pricing/" },
  { label: "Help", href: "/help/" },
  { label: "What's new", href: "/changelog/" },
  { label: "Feature requests", href: "/feature-requests/" },
  { label: "Support", href: "/support/" },
] as const;
