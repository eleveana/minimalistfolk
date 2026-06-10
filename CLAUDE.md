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

- **Store handle:** `the-mini-malist-apparel.myshopify.com`
- **Working theme:** `Relay` (id `139581489246`) — unpublished, this is what we customize
- **Current live theme:** `VALENTINES SALE` (id `137168650334`) — do not touch from CLI
- CLI version: 4.1.0 (`/opt/homebrew/bin/shopify`). Upgrade with `brew upgrade shopify-cli`.

```bash
# Pull latest Relay theme state from the store
cd theme && shopify theme pull \
  --store the-mini-malist-apparel.myshopify.com \
  --theme 139581489246

# Local dev with hot reload (proxies the store)
shopify theme dev --store the-mini-malist-apparel.myshopify.com

# Push edits back to the Relay theme (it stays unpublished)
shopify theme push \
  --store the-mini-malist-apparel.myshopify.com \
  --theme 139581489246

# List remote themes
shopify theme list --store the-mini-malist-apparel.myshopify.com
```

**Launch workflow:** We push edits to the unpublished Relay theme. Ana publishes via the Shopify admin when ready — **never** push `--live` from CLI.

## Brand Direction

Soft & natural aesthetic — see `design/DESIGN.md` for the full system.

- Palette: warm cream, sand, sage; charcoal for text
- Type: a humanist serif for headlines + a soft sans for body
- Tone: gentle, tactile, parent-to-parent — not corporate, not loud
- Imagery: natural light, real kids, organic textures (linen, cotton, wood)

## Time Tracking

Project hours are tracked in **ClickUp** via the `scripts/tt` CLI (Python, stdlib only). Setup once: see `docs/clickup-setup.md`.

```bash
tt start "what I'm doing"     # start a timer
tt stop                       # stop
tt status                     # is something running?
tt log --today                # today's entries
tt report --week              # weekly totals grouped by description (invoice-ready)
tt tasks                      # list ClickUp tasks in the configured list
tt start "..." --task <id>    # attach time to a specific ClickUp task
```

Config is in `.env` (gitignored). State for the running timer lives in `~/.config/minimalist-tt/state.json`.

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
