---
title: The four rules (A–D)
summary: How StockReclaim classifies every exception — refunded-not-restocked, open return, confirmed loss, and restock-claimed-stock-unchanged.
category: How the audit works
order: 1
updated: 2026-08-31
---

Every exception StockReclaim finds falls into one of four rules. Each names a
different way a returned unit fails to make it back onto the shelf.

## Rule A — Refunded, not restocked

A refund was issued with the **Restock** box unchecked. The customer got their
money back, but the unit was never added back to sellable inventory. This is the
most common leak, and the one the Restock checkbox is supposed to prevent.

## Rule B — Open return, aging

A return is in progress — approved or in transit — and the unit hasn't been
restocked yet. Rule B tracks it and **ages** it, so a return that quietly stalls
becomes visible instead of disappearing.

## Rule C — Confirmed loss

A return was dispositioned as **not restocked** or **missing** — a deliberate
write-off recorded through a returns app or the API. StockReclaim surfaces and
totals these so they're counted, not forgotten.

## Rule D — Restock claimed, stock unchanged *(Growth)*

A restock *was* recorded — a refund with Restock checked, or a return
dispositioned as restocked — but the on-hand level **never actually moved**.
This is the check no returns portal runs on itself.

Rule D is **forward-only**: Shopify keeps no historical log of inventory
adjustments, so StockReclaim can only watch levels from the moment it's watching.
Its coverage grows the longer it runs — which is why it's part of continuous
assurance on Growth, not a one-time backfill.

## Netting

A single physical unit can trigger more than one signal — for example a refund
*and* an open return. StockReclaim nets these so one unit is counted once, never
double-counted in your total.
