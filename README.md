# minimalist

Shopify storefront for **minimalist** — a kids clothing brand. Built on the **Relay** theme with a soft & natural design system.

## Quick start

```bash
# 1. Authenticate
shopify auth login

# 2. Pull the Relay theme
cd theme
shopify theme pull --store <store-handle>.myshopify.com

# 3. Run local dev
shopify theme dev --store <store-handle>.myshopify.com
```

## Documentation

- `CLAUDE.md` — context for AI assistants, project conventions, CLI workflow
- `design/DESIGN.md` — color, type, spacing, motion, imagery direction
- `docs/asset-specs.md` — image dimensions, formats, naming conventions

## Structure

```
theme/    Relay theme source (Shopify CLI managed)
design/   Design system docs and tokens
docs/     Brand guide, ops notes
assets/   Source assets (brand, products, lifestyle, icons)
```
