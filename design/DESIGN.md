# minimalist folk co — Design System

Source of truth: the owner's mockup
(`/Users/anaborba/Downloads/minimalist_folk_co_butter_homepage_with_gold.html`).
This system describes a **playful, colorful kids brand** — butter-yellow canvas,
five bold brand colors, multi-color logo, lowercase voice, rounded shapes.

## Design Principles

1. **Butter is the canvas** — everything sits on butter `#FBF1CC`. Not white, not cream.
2. **Joyful color, intentionally placed** — five brand colors are featured, not decorative. Each one carries meaning (petrol = grounding, orange = energy, gold = warmth, olive = nature, lavender = softness).
3. **Lowercase by default** — headings, nav, buttons. Brand voice is friendly, not formal.
4. **Pill everything** — buttons and category chips are full pills (radius 30px). Cards are softly rounded (12–14px).
5. **Quiet motion** — marquee scrolls, gentle fades. No bounce, no parallax tricks.
6. **Multi-color, not rainbow** — color appears in deliberate clusters (logo, category pills, marquee). Body content stays calm.

---

## Color Palette

### Surfaces
| Token | Hex | Use |
|---|---|---|
| `--butter` | `#FBF1CC` | Default page background, header, content sections |
| `--ribbon` | `#F6E8AE` | Marquee strip, secondary warm surface |
| `--ribbon-border` | `#ECDFA6` | Hairline divider on butter sections |

### Brand colors
| Token | Hex | Role |
|---|---|---|
| `--petrol` | `#17404F` | Primary brand. Logo, nav links, primary buttons, announcement bar |
| `--orange` | `#F15C2E` | Energy. Hero bg, prices, sale callouts, accent dots, "sale" link |
| `--gold` | `#F4A21A` | Warmth. Promo codes, "sale" category pill, secondary accents |
| `--olive` | `#8A9140` | Nature. "Bottoms" category pill, marquee accent |
| `--lavender` | `#B196CC` | Softness. "Dresses" category pill, marquee accent |

### Soft tints (on-orange text and image stand-ins)
| Token | Hex | Use |
|---|---|---|
| `--peach-100` | `#FFF1EC` | Headline text on orange hero |
| `--peach-200` | `#FCE0D6` | Subhead text on orange hero |
| `--cream-shadow` | `#E6D9AD` | Image placeholder, soft inset on butter |
| `--petrol-tint` | `#CFE0E6` | Text on petrol pills (e.g. "knits") |

### Functional
| Token | Hex | Use |
|---|---|---|
| `--text-default` | `#17404F` | Primary text on butter (petrol, never black) |
| `--text-soft` | `#6B6B66` | URL bar / meta / captions |
| `--sale-bg` | `#C64113` | Sale price bg (darker orange for contrast) |
| `--success` | `#8A9140` | In-stock badges (olive) |

### Pill recipes (category chips)
Each chip uses a brand color background with a tinted readable foreground:

| Chip | Bg | Text |
|---|---|---|
| bottoms | `#8A9140` (olive) | `#2F330D` |
| tops | `#F15C2E` (orange) | `#FFFFFF` |
| dresses | `#B196CC` (lavender) | `#3D2F55` |
| knits | `#17404F` (petrol) | `#CFE0E6` |
| sale | `#F4A21A` (gold) | `#4A3208` |

---

## Typography

### Display / headings
**Fraunces**, weight **800** (extra bold). Imported from Google Fonts:
```
family=Fraunces:opsz,wght@9..144,800
```
In the Shopify theme this is the `fraunces_n8` font handle (`type_header_font`).

### Body / UI
**Poppins**, weight **400** (regular) — owner's pick. Used for body, nav, subheadings, and buttons. In the Shopify theme this is the `poppins_n4` font handle.

### Case
**Lowercase everywhere by default.** Headings, nav, buttons, category chips. Exception: brand names, proper nouns.

### Letter spacing
- Headings: `-1px` (tight, per mockup hero)
- Body: normal
- Nav / pills: `+0.3px` (subtle airiness on small uppercase-mimicking text)

### Scale (from mockup, mobile → desktop)
| Token | Desktop | Use |
|---|---|---|
| `--text-hero` | 46–48px | Hero headline |
| `--text-display` | 36px | Section heads, marquee |
| `--text-h2` | 26px | Logo wordmark |
| `--text-lead` | 15px | Hero subhead |
| `--text-base` | 14px | Body, nav, buttons |
| `--text-meta` | 13px | Price, captions, pills |
| `--text-micro` | 12px | URL bar style copy |

---

## Shape

- **Pill buttons / chips**: `border-radius: 30px`
- **Cards / product tiles**: `border-radius: 12–14px`
- **Container/page chrome**: `border-radius: 0` (full-bleed)
- **Hairlines**: `0.5px` solid `--ribbon-border` between butter sections
- **No drop shadows.** Depth comes from color shifts.

---

## Motion

- **Marquee:** 18s linear infinite, translateX(0 → -50%) — see mockup `@keyframes mfcgold`
- **Button hover:** 150ms ease-out, slight bg-color shift (e.g. petrol → darker petrol `#0E2C38`)
- **Page transitions:** fade only, 250ms
- **No parallax, no bounce.**

---

## Voice & copy

From the mockup, headlines lean **playful + warm + lowercase**:
- "little people, big personalities" (hero)
- "new spring arrivals just landed" (hero subhead)
- "inspired by play" / "inspired by joy" / "inspired by curiosity" (marquee)
- "shop new in" / "shop the sale" (CTAs)
- "free shipping on orders over $75 — code **hello10** for 10% off your first order" (announcement)

Tone rules:
- Lowercase default
- Use `—` (em dash) not hyphens
- Bold colored words inside sentences sparingly (e.g. `hello10` in gold)
- Avoid corporate words: prefer "shop new in" over "shop new arrivals," "catalog" over "all products"

---

## Multi-color logo

The wordmark "minimalist folk co." cycles through the brand palette letter-by-letter:

```
m i n i m a l i s t   f o l k   c o .
↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓   ↓ ↓ ↓ ↓   ↓ ↓ ↓
P O V L G P O V L G   P O V L   G P O
```
(P=petrol, O=orange, V=olive, L=lavender, G=gold)

Render as inline SVG or per-character spans in the header snippet — never as a flat image, so the color rhythm survives at any size.

---

## Relay Theme Mapping

Active preset in `theme/config/settings_data.json` → `presets.Relay`.

### Scheme 1 (default — butter canvas)
```json
{
  "section_text": "#17404F",
  "section_bg": "#FBF1CC",
  "section_bg_light": "#F6E8AE",
  "btn_primary_bg": "#17404F",
  "btn_primary_text": "#FBF1CC",
  "btn_primary_border": "#17404F",
  "btn_secondary_bg": "#F15C2E",
  "btn_secondary_text": "#FFFFFF",
  "btn_secondary_border": "#F15C2E",
  "accent": "#F4A21A",
  "lines_and_border": "#ECDFA6",
  "links": "#17404F"
}
```

### Header strip
```
menu_bg_color:           #FBF1CC
header_link:             #17404F
submenu_bg_color:        #FBF1CC
submenu_link_color:      #17404F
menu_transparent_color:  #FBF1CC
```

### Additional schemes (per-section warmth)
- **Scheme 2 — Orange hero**: bg `#F15C2E`, text `#FFF1EC`, used for hero
- **Scheme 3 — Petrol feature**: bg `#17404F`, text `#FBF1CC`, used for announcement / dark features
- **Scheme 4 — Ribbon marquee**: bg `#F6E8AE`, text `#17404F`, used for ticker strip
- **Scheme 12 — Butter + gold**: bg `#FBF1CC`, text `#17404F`, primary button gold `#F4A21A` on `#4A3208`, secondary petrol, accent orange `#F15C2E`. For butter sections where gold should lead (e.g. Shop by Category) — from `minimalist_folk_co_butter_homepage_with_gold.html`

Apply via theme editor → each section → "Color scheme" picker.
