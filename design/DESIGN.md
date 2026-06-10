# minimalist — Design System

Crisp warm minimal aesthetic for a kids clothing brand. White canvas, warm accents, gentle motion.

## Design Principles

1. **White canvas, warm accents** — pages are white; cream/sand surfaces appear in feature blocks, cards, and section dividers to keep the brand warm.
2. **Charcoal over black** — text stays `#2B2A26`, never pure black.
3. **Generous breath** — whitespace is the loudest design element.
4. **Real not staged** — natural light, real kids, real wear.
5. **Soft geometry** — rounded corners (8–16px), nothing sharp.
6. **Quiet motion** — fades and gentle scrolls; no bounce, no parallax tricks.

---

## Color Palette

### Core surfaces
| Token | Hex | Use |
|---|---|---|
| `--canvas` | `#FFFFFF` | Default page background (Scheme 1 `section_bg`) |
| `--linen` | `#FDFBF7` | Subtle off-white for layered surfaces, modals, drawers |
| `--cream` | `#F7F2EA` | Warm accent surface — feature blocks, story sections, image backdrops |
| `--sand` | `#E8DCC8` | Warm dividers, cards, hover states |
| `--clay` | `#C9A98A` | Warm accent for callouts, secondary buttons |

### Brand accents
| Token | Hex | Use |
|---|---|---|
| `--sage` | `#8FA68A` | Primary brand accent, CTAs |
| `--sage-deep` | `#5D7558` | Hover, active state for sage |
| `--blush` | `#E8C4B8` | Tertiary accent, soft highlights |

### Text & lines
| Token | Hex | Use |
|---|---|---|
| `--charcoal` | `#2B2A26` | Primary text |
| `--stone` | `#6B675F` | Secondary text, captions |
| `--mist` | `#D9D2C5` | Borders, hairlines |

### Functional
| Token | Hex | Use |
|---|---|---|
| `--success` | `#7A9B6E` | Cart confirm, in-stock |
| `--alert` | `#B85C3A` | Errors, low stock |

Map these to Relay theme settings under **Theme settings → Colors**. Replace Relay's defaults with the values above.

---

## Typography

### Display / headings
**Editorial humanist serif** — warmth + a bit of personality.
- Suggested: **Cormorant Garamond**, **Fraunces** (variable), or **PP Editorial New**
- Default: **Fraunces** (variable, free on Google Fonts, soft optical sizes)

### Body / UI
**Soft geometric sans** — high legibility, friendly.
- Suggested: **Inter**, **Söhne**, **Plus Jakarta Sans**
- Default: **Plus Jakarta Sans** (free on Google Fonts)

### Type scale (rem, mobile → desktop)
| Token | Mobile | Desktop | Use |
|---|---|---|---|
| `--text-xs` | 0.75 | 0.75 | Caption, micro labels |
| `--text-sm` | 0.875 | 0.875 | Secondary UI |
| `--text-base` | 1 | 1 | Body |
| `--text-lg` | 1.125 | 1.25 | Lead paragraph |
| `--text-xl` | 1.5 | 1.75 | Section sub-headings |
| `--text-2xl` | 2 | 2.5 | Section headings |
| `--text-3xl` | 2.5 | 3.5 | Page titles |
| `--text-hero` | 3 | 5 | Hero display |

Line-heights: headings `1.15`, body `1.6`. Letter-spacing: headings `-0.01em`, body `0`.

---

## Spacing & Layout

Base unit: `4px`. Scale: `4, 8, 12, 16, 24, 32, 48, 64, 96, 128`.

- Max content width: `1280px`
- Comfortable reading column: `680px`
- Section vertical padding: `96px` desktop / `64px` mobile
- Grid gutter: `24px` desktop / `16px` mobile

---

## Shape & Surface

- **Border radius**: `4px` (chips), `8px` (buttons, inputs), `16px` (cards), `24px` (imagery containers, when applicable)
- **Shadows**: avoid drop shadows. Use `1px solid var(--mist)` borders for elevation.
- **Dividers**: hairlines only (`1px var(--mist)`), never thick rules.

---

## Motion

- Durations: `150ms` (micro), `250ms` (default), `400ms` (page-level)
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)` (default), `cubic-bezier(0.2, 0, 0, 1)` (entrances)
- No bounce. No parallax. Page transitions should fade, not slide.

---

## Imagery Guidance

- Natural daylight, soft shadows
- Real kids, candid moments — avoid studio-perfect smiles
- Texture matters: linen sheets, wood floors, plants in frame
- Crop: leave breathing room; subjects rarely centered
- Color grade: lift shadows slightly, warm midtones (~+5 temp)
- **Avoid**: harsh strobe, stark white seamless, oversaturated brights

### Asset specs
| Use | Dimensions | Format |
|---|---|---|
| Hero | 2880×1600 (2x: 1440×800) | WebP + JPG fallback |
| Product thumb | 1200×1500 (4:5) | WebP |
| Lifestyle | 2000×1333 (3:2) | WebP |
| OG / share | 1200×630 | JPG |

---

## Components (high-level)

These will be customized inside Relay's section/snippet system.

- **Buttons**: pill-shape (radius 9999px), 14px vertical padding, sage primary, clay secondary, ghost (no fill) tertiary
- **Inputs**: cream-filled, 1px mist border, 8px radius, charcoal text, sage focus ring
- **Cards**: linen background, 16px radius, no shadow, hairline border on hover
- **Navigation**: text-only, no underlines until hover (animated underline grows L→R)

---

## Relay Theme Mapping

When you pull the Relay theme, override these in `theme/config/settings_data.json`:

Relay uses **color schemes**. The default scheme is `scheme-1`, applied to most sections via `color_scheme: "scheme-1"`. Override these in `theme/config/settings_data.json` under `current.color_schemes.scheme-1.settings`:

```json
{
  "section_text": "#2B2A26",
  "section_bg": "#FFFFFF",
  "section_bg_light": "#F7F2EA",
  "btn_primary_bg": "#8FA68A",
  "btn_primary_text": "#FFFFFF",
  "btn_primary_border": "#8FA68A",
  "btn_secondary_bg": "#C9A98A",
  "btn_secondary_text": "#2B2A26",
  "btn_secondary_border": "#C9A98A",
  "accent": "#8FA68A",
  "lines_and_border": "#D9D2C5",
  "links": "#2B2A26"
}
```

Additional schemes (2–11) cover dark backgrounds, sage feature blocks, and cream accent panels — used per-section via the theme editor's "Color scheme" picker.
