# minimalist — Shopify Storefront

Kids clothing brand running on Shopify with the **Relay** theme (Shopify Theme Store).

## Project Layout

```
minimalist/
├── theme/         # Relay theme files (pulled via Shopify CLI)
├── design/        # DESIGN.md + tokens, brand exploration
├── docs/          # Brand guide, content strategy, ops notes
├── assets/        # Source assets (not yet optimized for theme)
│   ├── brand/     # Logo files, wordmarks, brand marks
│   ├── products/  # Product photography (raw / hi-res)
│   ├── lifestyle/ # Lifestyle / editorial imagery
│   └── icons/     # Custom icons, illustrations
└── CLAUDE.md      # This file
```

The `theme/` directory mirrors what Shopify expects:
`assets/  config/  layout/  locales/  sections/  snippets/  templates/`. Edits there are pushed back via Shopify CLI.

## Shopify CLI Workflow

CLI version: 4.1.0 (`/opt/homebrew/bin/shopify`). If outdated, upgrade with `brew upgrade shopify-cli`.

```bash
# First-time auth (opens browser)
shopify auth login

# Pull the live Relay theme into ./theme
cd theme && shopify theme pull --store <store-handle>.myshopify.com

# Local dev with hot reload (proxies the live store)
shopify theme dev --store <store-handle>.myshopify.com

# Push edits back as an unpublished theme
shopify theme push --unpublished --theme-name "minimalist-dev"

# List remote themes
shopify theme list --store <store-handle>.myshopify.com
```

**Always push to an unpublished theme first.** Never `--live` without an explicit review.

## Brand Direction

Soft & natural aesthetic — see `design/DESIGN.md` for the full system.

- Palette: warm cream, sand, sage; charcoal for text
- Type: a humanist serif for headlines + a soft sans for body
- Tone: gentle, tactile, parent-to-parent — not corporate, not loud
- Imagery: natural light, real kids, organic textures (linen, cotton, wood)

## Working Conventions

- Theme edits happen in `theme/` only. Source assets stay in `assets/` and get optimized before being copied into `theme/assets/`.
- Image specs: see `docs/asset-specs.md` (TBD).
- Brand decisions live in `design/DESIGN.md`. Update it when the system evolves — don't let theme settings drift without reflecting them there.
- Commits should describe *why* a change was made for the brand, not just *what* file changed.

## Useful Commands

```bash
# Optimize images before adding to theme/assets/
# (placeholder — pick sharp-cli, squoosh, or imageoptim)

# Validate theme
shopify theme check

# Open theme editor for the live store
shopify theme open --store <store-handle>.myshopify.com
```
