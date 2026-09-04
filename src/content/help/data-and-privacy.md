---
title: Data and privacy
summary: What StockReclaim reads, what it never stores, the one thing it can write, and how removal works.
category: Data & privacy
order: 1
updated: 2026-08-31
---

StockReclaim is built to hold as little of your data as possible.

## What it reads

To audit returns, the app reads products, inventory, locations, orders and
returns. It reads them **live** during a scan and uses the result to compute your
figure.

## What it never stores

No products, orders, refunds or inventory are copied into StockReclaim. The scan
reads live and discards. The only things kept are:

- a **rebuildable cache** of the latest scan result, so the dashboard loads
  instantly (deleted when you uninstall);
- the **last-seen inventory level** per item and location, kept only so Rule D
  can tell whether a level moved — no history, no copy of your catalog;
- your **decisions** (resolved, written off, restocked) so a handled case stays
  handled across scans.

## What it can write

Exactly one thing: **Restock now**, and only when you click it on a specific
exception. The scan itself never writes. See [Restock now](/help/restock-now/).

## What we can't see

StockReclaim can't see your physical shelf. It reports where the *record* and the
*adjustment* disagree — it never claims a physical count and never asserts an item
is definitely gone.

## Removing your data

Uninstalling triggers Shopify's data-removal flow. StockReclaim deletes the cache
and all stored records for your shop, and confirms the deletion. Standard Shopify
GDPR requests (customer and shop redaction) are honored automatically.

## Protected customer data

StockReclaim is declared for **store management** use and requests **none** of the
optional personal-data fields. It works entirely from order and returns metadata.
