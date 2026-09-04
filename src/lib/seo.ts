/** Structured data shared across pages. Kept factual: no ratings, no invented counts. */
export const ORIGIN = "https://stockreclaim.com";

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "StockReclaim",
  url: ORIGIN,
  logo: `${ORIGIN}/icon-512.png`,
  sameAs: [] as string[],
};

export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "StockReclaim",
  url: ORIGIN,
};

export const softwareLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "StockReclaim",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web (Shopify app)",
  url: ORIGIN,
  description:
    "A returns audit for Shopify. Finds refunded and returned items that never made it back into sellable inventory, prices the loss, and lets the merchant restock in one click.",
  offers: [
    { "@type": "Offer", name: "Free", price: "0", priceCurrency: "USD" },
    { "@type": "Offer", name: "Starter", price: "39", priceCurrency: "USD", billingIncrement: "P1M" },
    { "@type": "Offer", name: "Growth", price: "89", priceCurrency: "USD", billingIncrement: "P1M" },
  ],
};

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${ORIGIN}${it.path}`,
    })),
  };
}

export function blogPostingLd(p: {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  updatedAt: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.summary,
    datePublished: p.publishedAt,
    dateModified: p.updatedAt,
    mainEntityOfPage: `${ORIGIN}/blog/${p.slug}/`,
    url: `${ORIGIN}/blog/${p.slug}/`,
    image: `${ORIGIN}/og-default.png`,
    author: { "@type": "Organization", name: "StockReclaim", url: ORIGIN },
    publisher: {
      "@type": "Organization",
      name: "StockReclaim",
      logo: { "@type": "ImageObject", url: `${ORIGIN}/icon-512.png` },
    },
  };
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}
