# Muse Market

A mobile-first marketplace discovery prototype with natural-language catalogue search and a separate community feed.

## Run locally

Use Node.js 22.13 or newer. Install dependencies using the committed package manager lockfile (`pnpm install`), then run `pnpm dev`. Open the address printed by the development server. Build with `pnpm build`.

## What's working

- Prompt home, category and budget matching, masonry results with prices and sample review counts.
- Product details and bookmarks.
- Independent Search and Community footer tabs, preserving their mounted scroll containers.
- Community search, Discover / Following / Saved feeds, full-page profiles and posts, likes, bookmarks and inline replies.
- Full-page post creation and editing with photo, video, text and voice-note carousels.
- Gallery/camera uploads, required Instagram or Snapchat usernames and WhatsApp sharing.
- Switzer typography, translucent white tiles and responsive two-column mobile search results.
- Browser-local persistence for demo interactions.

## Prototype boundaries

All sellers, prices, ratings, posts and product descriptions are fictional sample data. Photographs are inspiration assets, not verified sale listings. Multiple listings may reuse the same photo. Search uses deterministic keyword/category matching and maximum-price extraction, not a live LLM or Instagram API. Interactions are saved only in the current browser, not shared between users. There are no accounts, checkout, live stock checks or seller links. Sharing uses the device share sheet where supported, clipboard fallback, and a separate WhatsApp action.

The optional `search_catalogue` WebMCP tool is feature-detected; browsers without it work normally.

## Structure

- `app/page.tsx`: interactive prototype.
- `app/catalogue.ts`: sample catalogue and search.
- `app/globals.css`: responsive design.
- `public/products`: local product inspiration images.
- `ASSETS.md`: image sources and credits.

This project uses React, TypeScript and the Vinext compatibility runtime with a Cloudflare-compatible build. Sites-specific configuration is under `.openai` and scripts. A separate production integration should add real seller data, shared authentication/persistence, search evaluation, and reporting/moderation before launch.

## GitHub and deployment

GitHub repository: https://github.com/rawatnikita/museMarket

Live prototype: https://muse-market.nikitarawat059.chatgpt.site

GitHub stores the source code. Publishing to the existing Site continues to update the same live URL; GitHub commits alone do not deploy it.

To push updates from a local checkout:

```sh
git remote add github https://github.com/rawatnikita/museMarket.git
git push -u github main
```

Keep the existing `origin` remote for managed previews. Do not commit `.env` files, credentials, generated build output, or browser/user data. No API keys are required for this prototype.
