---
title: Installing and your first scan
summary: Install from the App Store, open the dashboard, and read your first dollar figure — usually within ten minutes.
category: Getting started
order: 2
updated: 2026-08-31
---

## Install

1. Open StockReclaim on the Shopify App Store and click **Install**.
2. Approve the access request. StockReclaim reads products, inventory, locations,
   orders and returns; the only thing it can write is a restock you trigger
   yourself (see [Restock now](/help/restock-now/)).
3. You land on the **Dashboard** inside your Shopify admin.

There's nothing to configure. The scan runs on its own.

## Your first figure

On install, StockReclaim scans the **last 60 days** of refunds and returns and
shows a headline total, split by cause. On a paid plan the window extends to
**12 months** of history.

If your store genuinely has no unrecovered returns, the dashboard says so — and
distinguishes *"clean"* from *"nothing to check yet."* A clean result is a
result, not a broken app.

## Seeing it work on a test store

On a fresh store there may be nothing to find. To prove the audit end to end:

1. Create a product with stock, and an order for it. Mark it paid and fulfilled.
2. Refund that order and **uncheck "Restock"** on the refund screen.
3. Reload the Dashboard. That refund appears as a **Rule A** exception, with its
   dollar value in the headline.

## If a banner appears

If the dashboard shows a note about missing order or return access, re-authorize
the app so it can pick up the current permissions. The audit degrades gracefully
rather than failing — it will tell you exactly what it couldn't reach.
