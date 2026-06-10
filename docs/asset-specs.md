# Asset Specifications

Source assets live under `/assets/` and are optimized before being copied into `theme/assets/`.

## Folder Conventions

| Folder | Purpose |
|---|---|
| `assets/brand/` | Logo (SVG primary), wordmark, monograms, favicons |
| `assets/products/` | Product photography — full-resolution originals |
| `assets/lifestyle/` | Editorial / lifestyle imagery for hero, story sections |
| `assets/icons/` | Custom UI icons, illustrations |

## Sizing

| Use case | Dimensions | Aspect | Format |
|---|---|---|---|
| Hero / banner | 2880×1600 | 9:5 | WebP + JPG fallback |
| Product (PDP main) | 2000×2500 | 4:5 | WebP |
| Product (grid thumb) | 1200×1500 | 4:5 | WebP |
| Lifestyle / editorial | 2000×1333 | 3:2 | WebP |
| OG / social share | 1200×630 | 1.91:1 | JPG |
| Logo (header) | SVG | — | SVG |
| Favicon | 512×512 (auto-derived) | 1:1 | PNG → ICO |

## Optimization

Before placing into `theme/assets/`:
- Strip EXIF
- Convert to WebP (quality 82) with JPG fallback (quality 85)
- Lazy-load by default in templates
- Target: hero < 250KB, PDP main < 200KB, thumbs < 80KB

## File Naming

`<category>_<context>_<variant>_<size>.<ext>` — lowercase, hyphens between words inside a segment.

Examples:
- `hero_spring-collection_main_2880.webp`
- `product_linen-romper_oat_2000.webp`
- `lifestyle_morning-light_03_2000.webp`
- `icon_cart_outline.svg`
