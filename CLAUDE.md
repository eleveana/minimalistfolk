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
- **Working theme:** `Relay` (id `139581489246`) — ⚠️ **now LIVE/published** (as of 2026-06-19). Ana published it via admin. Every push to this theme hits the live storefront.
- **Old live theme:** `VALENTINES SALE` (id `137168650334`) — now unpublished.
- **Pushing to Relay = pushing to production.** The CLI requires `--allow-live`. Always scope pushes to code only (`--only snippets/… --only assets/…`); never push owner JSON to live. Prefer `shopify theme dev` to preview, or push to an unpublished copy for risky changes, before touching live.
- CLI version: 4.2.0 (`/opt/homebrew/bin/shopify`). Upgrade with `brew upgrade shopify-cli`.

```bash
# Pull latest Relay theme state from the store
cd theme && shopify theme pull \
  --store the-mini-malist-apparel.myshopify.com \
  --theme 139581489246

# Local dev with hot reload (proxies the store)
shopify theme dev --store the-mini-malist-apparel.myshopify.com

# Push edits to the Relay theme — ⚠️ THIS IS LIVE. Scope to code, requires --allow-live.
shopify theme push \
  --store the-mini-malist-apparel.myshopify.com \
  --theme 139581489246 \
  --allow-live \
  --only snippets/header-block.liquid

# List remote themes
shopify theme list --store the-mini-malist-apparel.myshopify.com
```

**Launch workflow:** Relay is now the live, published theme — there is no unpublished Relay sandbox anymore. Pushes go straight to production. Keep pushes scoped to individual code files, verify with `theme dev` first when in doubt, and treat every `--allow-live` push as a production deploy.

**Pull owner JSON before every push.** The store owner edits content/config through the Shopify admin, so the remote Relay theme drifts ahead of the local checkout on these files: `config/settings_data.json` and `templates/*.json`. A blind push overwrites that work. Before pushing, refresh them from the remote:

```bash
cd theme && shopify theme pull \
  --store the-mini-malist-apparel.myshopify.com \
  --theme 139581489246 \
  --only config/settings_data.json --only "templates/*.json"
```

Then push. Prefer scoped pushes (`--only snippets/… --only assets/…`) for code changes — a push that names only non-JSON files can't clobber owner content. A `PreToolUse` hook (`.claude/hooks/shopify-push-guard.sh`) enforces this automatically: it auto-pulls owner JSON before any push that could touch it, and stops to ask if those files have uncommitted local edits. Edit `templates/*.json` and `settings_data.json` in the admin, not locally.

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
