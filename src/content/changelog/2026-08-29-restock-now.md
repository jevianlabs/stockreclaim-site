---
title: Restock now — fix an exception in one click
date: 2026-08-29
tag: New
plan: Starter
banner: "You can now put missing units back into sellable stock in one click, right from an exception."
---

StockReclaim can now **fix** an exception, not just find it.

On an exception where units are missing from sellable stock, **Restock now** adds
them back in one click, marks the case resolved, and logs the decision. It's the
app's only write — the scan still never changes anything on its own — and it's
idempotent, so a double-click can't double your quantity.
