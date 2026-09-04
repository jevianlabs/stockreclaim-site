---
title: Restock now — the one write
summary: How the single write action works, when to use it, and why it's the only thing StockReclaim ever changes.
category: How the audit works
order: 2
updated: 2026-08-31
---

StockReclaim is **read-mostly**. The scan never changes anything. There is
exactly one action that writes to your store, and it only runs when you click it.

## What it does

On an exception where the units are genuinely missing from sellable stock,
**Restock now** adds them back to inventory in one click. It:

1. Adds the un-recovered quantity to the sellable level at the right location.
2. Marks the exception **resolved**.
3. Logs the decision on the **Decisions** page.

## When to use it

Use Restock now when you've confirmed the units are physically on the shelf but
Shopify's count doesn't reflect it — the classic Rule A case (refunded, restock
forgotten). If the units are actually lost or damaged, use **Write off** instead,
which records the loss without changing inventory.

## Location

For rules that already carry a location (C and D), the restock goes to that
location. For a refund that isn't tied to a single fulfillment location, you
pick the location in a short confirmation step.

## Safe by design

The write is **idempotent** — clicking twice doesn't double the quantity. And
because it's the only write the app can make, you always know exactly what
StockReclaim changed, and when.
