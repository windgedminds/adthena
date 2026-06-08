# Adthena Design System

Apply these rules for **any UI design, prototyping, mockup, component decision, layout spec, or HTML/React code generation** touching Adthena's product. When in doubt, use this file.

---

## Step 1 — Discover components (always do this first)

Before building any UI, fetch the live component registry from GitHub:

```
https://api.github.com/repos/pavelfernandez-Atd/claude_desig_system/contents/components
```

Parse the `name` field from each item in the response — these are the available components. The list updates automatically as new components are added to the repo; never rely on a remembered list.

---

### For every component you intend to use — fetch ALL THREE files before writing a single line of code:

**1. Spec / documentation**
```
https://raw.githubusercontent.com/pavelfernandez-Atd/claude_desig_system/main/components/[component-name]/README.md
```

**2. Exact HTML markup** ← the authoritative source for structure and SVGs
```
https://raw.githubusercontent.com/pavelfernandez-Atd/claude_desig_system/main/components/[component-name]/demo.html
```

**3. Exact CSS** ← the authoritative source for every value, spacing, colour, state
```
https://raw.githubusercontent.com/pavelfernandez-Atd/claude_desig_system/main/components/[component-name]/[component-name].css
```

> **Critical rule — no reconstruction.**
> Copy `demo.html` markup and `[name].css` rules **verbatim** into your output.
> Do NOT rewrite, paraphrase, or reconstruct them from memory or from the README.
> Reconstruction is the root cause of hallucinated component details (wrong sizes, wrong colours, wrong SVGs, added elements that don't exist in the spec).
> The only permitted deviation is adapting page-level wrappers (e.g. adding `position:fixed` to an app-bar for a full-page layout) — never alter the component's own HTML structure or CSS values.

---

For the full design token source of truth:

```
https://raw.githubusercontent.com/pavelfernandez-Atd/claude_desig_system/main/src/design-tokens.ts
```

For the visual style guide (full component documentation with examples):

```
https://raw.githubusercontent.com/pavelfernandez-Atd/claude_desig_system/main/styleguide/index.html
```

For the compiled all-in-one component stylesheet — **link this in every HTML prototype** instead of copying individual component CSS files:

```
https://raw.githubusercontent.com/pavelfernandez-Atd/claude_desig_system/main/styleguide/ds-components.css
```

Include it at the top of any single-file HTML prototype:

```html
<link rel="stylesheet" href="https://raw.githubusercontent.com/pavelfernandez-Atd/claude_desig_system/main/styleguide/ds-components.css">
```

Or download it once and reference it locally:

```html
<link rel="stylesheet" href="ds-components.css">
```

> **Note:** `ds-components.css` bundles every component stylesheet in the repo. When using it, you still must fetch the individual `demo.html` for each component (see Step 1) — the CSS is already covered by this file, but the HTML markup must be copied verbatim from `demo.html`.

---

## Step 2 — Pre-code checklist (mandatory, every prototype)

Before writing a single line of HTML or CSS, verify all three:

- [ ] `<link rel="stylesheet" href="ds-components.css">` is the **first** stylesheet in `<head>`
- [ ] Every component's HTML was copied **verbatim** from its `demo.html` — not typed from memory, not reconstructed from the README
- [ ] No `<style>` block contains rules targeting **component class names** (`.app-bar`, `.kpi-card`, `.main-nav`, `.service-bar`, `.card-header`, `.ds-chip`, `.subtab`, `.mclc`, `.donut-chart`, `.ibc`, etc.) — those are already defined in `ds-components.css`

**If any box is unchecked, stop and fix it before continuing.**

The only CSS permitted in `<style>` is **page-level layout**: fixed positioning offsets, content area padding, grid/flex wrappers, and utility classes that have no equivalent in the DS. Never redefine what the DS already owns.

### ❌ Wrong — rewriting component CSS inline:

```html
<style>
  .kpi-card { background: white; border-radius: 12px; padding: 16px; }
  .app-bar { background: #063059; height: 50px; position: fixed; }
</style>
```

### ✅ Right — linking the stylesheet, copying markup verbatim:

```html
<head>
  <link rel="stylesheet" href="ds-components.css">
  <!-- page-level layout only below -->
  <style>
    .content { padding-top: 74px; padding-left: 278px; }
  </style>
</head>
<body>
  <!-- copied verbatim from app-bar/demo.html -->
  <nav class="app-bar">
    <div class="app-bar__content"> … </div>
  </nav>
  <!-- copied verbatim from kpi-card/demo.html -->
  <div class="kpi-card"> … </div>
</body>
```

---

## Design Tokens

### Colours

| Token | Hex | Usage |
|---|---|---|
| Page BG | `#e5eef5` | `<body>` / root background |
| Card BG | `#ffffff` | All cards, panels, sidebars |
| Card Light | `#fafafa` | Default/inner surface |
| Card Tinted | `#f7faff` | Insight/callout boxes inside cards |
| Navy | `#063059` | App bar, sidebar header |
| Fill Main | `#1565c0` | CTA buttons, primary actions |
| Fill Dark | `#063059` | Deep navy, headings on dark |
| Primary Main | `#0c8dea` | Links, active elements |
| Primary Medium | `#3079bd` | Secondary buttons |
| Primary Bright | `#5bb3f9` | KPI accents |
| Selected Soft | `#eaf4ff` | Active nav highlight bg |
| Text Primary | `rgba(0,0,0,0.87)` | Headings, body on white |
| Text Secondary | `rgba(0,0,0,0.6)` | Subtitles, muted |
| Text Disabled | `rgba(0,0,0,0.38)` | Disabled states |
| Text Body | `#27365b` | Body copy inside cards |
| Text Label | `#485982` | KPI labels, overlines |
| Text Sub | `#6477a2` | Badge/meta text |
| Grey Dark | `#2b2b2b` | Nav item labels |
| Border | `rgba(0,0,0,0.12)` | Card / input borders |
| Green Positive | `#40af46` | Positive change / growth |
| Red Negative | `#de5a5a` | Negative change / decline |
| Warning | `#ef6c00` | Warning states |
| Error | `#c62828` | Error states |

### Chart colour palette (polychromatic series)

Assign in index order. Never skip or reorder unless a series has a fixed semantic colour.

| Index | Hex | Name |
|---|---|---|
| 01 | `#b3a2e7` | Purple |
| 02 | `#64abfb` | Blue |
| 03 | `#d47dd4` | Magenta |
| 04 | `#e86492` | Crimson |
| 05 | `#8ac8b1` | Green |
| 06 | `#53bdc5` | Teal |
| 07 | `#ff7a1a` | Orange |
| 08 | `#de5a5a` | Red |
| 09 | `#435a97` | Navy |
| 10 | `#814e2c` | Brown |
| 11 | `#c8d09c` | Olive |
| — | `#d3dbe6` | Neutral (inactive / "other" segments) |
| — | `#e8eaf5` | Null (no-data / empty states) |

**Rules:**
- Single-series: use `#b3a2e7` (Purple 01)
- Two-series: Purple 01 + Blue 02
- Semantic overrides take priority: `#40af46` green / `#de5a5a` red for UI feedback (not series colours)

### Typography

| Role | Size | Weight | Colour |
|---|---|---|---|
| Font family | `'Open Sans', Helvetica, sans-serif` | — | — |
| KPI value | `44px` | 300 | `#27365b` |
| Section heading | `16px` | 600 | `rgba(0,0,0,0.87)` |
| Body | `14px` | 400 | `rgba(0,0,0,0.87)` |
| KPI label | `12px` | 600 | `#485982` |
| Caption / meta | `12px` | 400 | `rgba(0,0,0,0.6)` |
| Button (md) | `14px` | 600 | — |
| Chart legend | `13px` | 300 | `#38476a` · `'Open Sans Condensed'` |

KPI number specifics: `letter-spacing: -3px`, `line-height: 44px`

### Spacing & radii

| Measurement | Value |
|---|---|
| Page outer padding | `24px` |
| Card gap | `16px` (`gap-4`) |
| Card corner radius | `12px` (`rounded-xl`) — universal, no exceptions |
| Card inner padding | `24px` (`p-6`) standard · `16px` (`p-4`) KPI cards |
| Callout box radius | `12px` |
| Filter pill / chip radius | `200px` |
| App bar height | `50px` |
| Sidebar container width | `254px` |
| Nav card side margin | `16px` each side |
| Nav card top margin | `24px` |
| Content left offset | `278px` (254px sidebar + 24px gap) |
| Content top offset | `74px` (50px app bar + 24px gap) |
| Content max-width | `1200px` |

### Shadows

| Role | Value |
|---|---|
| Card | `0 0 16px rgba(23,42,68,0.2)` |
| Modal | `0 0 16px rgba(26,32,54,0.2)` |
| Hero card | `0 4px 14px rgba(9,58,107,0.2)` |
| Tooltip | `filter: drop-shadow(…)` via CSS |

---

## Page Layout — Canonical Structure

```
┌──────────────────────────────────────────────────────────────────────┐
│  App Bar  h-[50px]  bg-[#063059]  fixed  top-0  left-0  right-0  z-50│
└──────────────────────────────────────────────────────────────────────┘
  24px gap (mt-6)
┌────────────────────┐       ┌───────────────────────────────────────┐
│  bg-[#e5eef5]      │ 24px  │  bg-[#e5eef5]  (page background)      │
│  ┌──────────────┐  │──────▶│  pt-[74px]  pl-[278px]  pr-6  pb-10   │
│  │  Nav Card    │  │       │  ┌───────────────────────────────────┐ │
│  │  bg-white    │  │       │  │  Service Bar  bg-white  rounded-xl│ │
│  │  rounded-xl  │  │       │  └───────────────────────────────────┘ │
│  │  mx-4 mt-6   │  │       │  16px gap                              │
│  └──────────────┘  │       │  ┌───────────────────────────────────┐ │
│  fixed left-0      │       │  │  Card  bg-white  rounded-xl       │ │
│  w-[254px]         │       │  └───────────────────────────────────┘ │
└────────────────────┘       └───────────────────────────────────────┘
```

### Page shell (TSX)

```tsx
export const PageLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-[#e5eef5] w-full min-h-screen">

    {/* 1. App Bar — fixed top */}
    <div className="fixed top-0 left-0 right-0 z-50">
      <AppBar />
    </div>

    {/* 2. Navigation Sidebar — fixed left */}
    <div className="fixed top-[50px] left-0 bottom-0 z-40 w-[254px]
                    overflow-y-auto bg-[#e5eef5]">
      <div className="mx-4 mt-6">
        <NavigationSidebar />  {/* renders bg-white rounded-xl internally */}
      </div>
    </div>

    {/* 3. Scrollable content area */}
    <div className="pt-[74px] pl-[278px] pr-6 pb-10 bg-[#e5eef5] min-h-screen">
      <div className="flex flex-col gap-4 max-w-[1200px] mx-auto">
        <ServiceBar />
        {children}
      </div>
    </div>

  </div>
);
```

### Card shell

```tsx
<div className="bg-white rounded-xl p-6">
  {/* Card header: roundel + title + subtitle + actions */}
  <div className="flex items-center gap-2 mb-4">
    <div className="w-8 h-8 bg-[#93a1b6] rounded-full flex items-center justify-center shrink-0">
      <img className="w-5 h-5" src={iconSrc} alt="" />
    </div>
    <div className="flex flex-col gap-0.5 flex-1">
      <span className="font-semibold text-[rgba(0,0,0,0.87)] text-base leading-[17px]">Title</span>
      <span className="text-[rgba(0,0,0,0.6)] text-[13px] leading-[14px]">Subtitle</span>
    </div>
    <img src="icon-download-outline.svg" className="w-5 h-5" alt="Download" />
    <img src="icon-info-outline.svg" className="w-5 h-5 text-[#3079bd]" alt="Info" />
  </div>
  {/* card body */}
</div>
```

---

## Layout Rules (authoritative — always follow)

| Rule | Value |
|---|---|
| App Bar | `fixed top-0 left-0 right-0 z-50 h-[50px] bg-[#063059]` |
| Page background | `bg-[#e5eef5]` — full `<body>` or root div |
| Sidebar container | `fixed top-[50px] left-0 bottom-0 z-40 w-[254px] bg-[#e5eef5]` |
| Nav card | `mx-4 mt-6 bg-white rounded-xl` inside sidebar container |
| Content area | `pt-[74px] pl-[278px] pr-6 pb-10` |
| Content column | `flex flex-col gap-4 max-w-[1200px] mx-auto` |
| Service Bar | Always first element inside content column |
| Cards | `bg-white rounded-xl` — no border, no shadow — universally |
| Card padding | `p-6` standard · `p-4` KPI cards |
| Card gap | `gap-4` (16px) between all cards |

---

## Callout / Insight Box

Used at the bottom of chart cards for AI-generated observations.

```tsx
<div className="bg-[#f7faff] rounded-xl p-3 flex items-start gap-2 mt-4">
  <div className="w-7 h-7 bg-[#b0d1f6] rounded-full flex items-center justify-center shrink-0">
    <img src="icon-alert-outline.svg" className="w-4 h-4" alt="" />
  </div>
  <p className="text-[13px] text-[rgba(0,0,0,0.6)] leading-[1.5]">
    Insight copy here. <span className="font-semibold">Coming soon.</span>
  </p>
</div>
```

---

## Output Defaults

| Request type | Format |
|---|---|
| Prototype / exploration | Single-file HTML — vanilla JS, inline CSS, no build step |
| Production component | React + TypeScript + Tailwind (matches existing codebase) |
| Design spec | Markdown — component names, token values, states |
| Figma annotation | Bullet list: variants, hover/active states, edge cases, responsive |

**HTML prototypes:** No external JS unless charting (CDN chart lib is fine). Google Fonts via `@import`. Fully self-contained single file.

**React:** Tailwind utility classes. File structure: `sections/` per screen, shared atoms in `components/ui/`.

---

## Interaction & Motion

- Bar/sparkline animations: trigger on `IntersectionObserver` enter, not on mount
- Duration `1000ms`, easing `ease-out`
- Chart entry: animate from 0 width/height (not fade)
- Tooltips: `rgba(0,0,0,0.8)` bg, white text, `border-radius: 6px`, `padding: 5px 10px`
- Active nav states: `bg-[#eaf4ff]` + bold text — never underlines
- Drill-downs: inline expansion (accordion), never modal overlays

---

## Icons & SVG Assets

All icons and SVGs must be **inlined** — no external CDN references. Fetch the exact SVG from the component's `demo.html` or `[name].css` (see Step 1).

**Adthena wordmark** — use this inline SVG wherever the logo appears:

```html
<svg width="90" height="20" viewBox="0 0 121 27" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M45.2888 16.2415H51.6053L48.4571 8.49345L45.2888 16.2415ZM43.129 21.4895H41.4004L48.3924 5.88951H48.6108L55.5147 21.4895H53.7868L52.1817 17.6159H44.734L43.129 21.4895Z" fill="white"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M57.3369 16.7358C57.3369 17.2739 57.4226 17.7773 57.5942 18.2465C57.7655 18.7157 58.0088 19.1226 58.3241 19.4674C58.6384 19.8124 59.0188 20.0851 59.4646 20.2847C59.9093 20.485 60.413 20.5851 60.9753 20.5851C61.5226 20.5851 62.0334 20.485 62.5065 20.2847C62.9784 20.0851 63.3863 19.8124 63.7289 19.4674C64.0713 19.1226 64.3385 18.7157 64.5307 18.2465C64.7223 17.7773 64.8182 17.2739 64.8182 16.7358C64.8182 16.1979 64.7223 15.6942 64.5307 15.225C64.3385 14.7561 64.0713 14.3488 63.7289 14.0038C63.3863 13.6596 62.9784 13.3868 62.5065 13.1861C62.0334 12.9866 61.5226 12.8865 60.9753 12.8865C60.413 12.8865 59.9093 12.9866 59.4646 13.1861C59.0188 13.3868 58.6384 13.6596 58.3241 14.0038C58.0088 14.3488 57.7655 14.7561 57.5942 15.225C57.4226 15.6942 57.3369 16.1979 57.3369 16.7358ZM66.1136 21.5779H64.7569V19.9642H64.716C64.4963 20.2952 64.236 20.578 63.9354 20.8128C63.6337 21.0474 63.3181 21.2404 62.9892 21.3919C62.6612 21.5444 62.322 21.6536 61.9721 21.7231C61.6225 21.7916 61.2906 21.8265 60.9758 21.8265C60.2216 21.8265 59.5338 21.6986 58.9098 21.4441C58.2864 21.1882 57.7488 20.8332 57.2969 20.3775C56.8443 19.9224 56.4918 19.3848 56.2383 18.7641C55.9844 18.1429 55.8584 17.4672 55.8584 16.7359C55.8584 16.005 55.9844 15.3285 56.2383 14.7078C56.4918 14.0869 56.8443 13.5489 57.2969 13.093C57.7488 12.6382 58.2864 12.2834 58.9098 12.0279C59.5338 11.7727 60.2216 11.6448 60.9758 11.6448C61.2906 11.6448 61.6225 11.6794 61.9721 11.7483C62.322 11.8178 62.6612 11.9279 62.9892 12.0795C63.3181 12.2313 63.6337 12.4245 63.9354 12.6589C64.236 12.8938 64.4963 13.176 64.716 13.5074H64.7569V5.9334H66.1136V21.5779Z" fill="white"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M74.0472 13.1348H71.2727V18.8464C71.2727 19.2057 71.3062 19.4983 71.3748 19.7261C71.4435 19.9539 71.5395 20.1298 71.6632 20.254C71.7862 20.3775 71.934 20.4642 72.1051 20.5125C72.2761 20.561 72.4646 20.5851 72.6705 20.5851C72.9028 20.5851 73.1428 20.5506 73.3896 20.4815C73.6358 20.4123 73.8627 20.3227 74.0678 20.2122L74.1292 21.4748C73.6218 21.709 73.0127 21.8265 72.3004 21.8265C72.0401 21.8265 71.7692 21.7915 71.489 21.7231C71.2069 21.6536 70.9506 21.5232 70.7181 21.3296C70.4847 21.1367 70.2931 20.8746 70.1421 20.5434C69.991 20.2122 69.9158 19.7775 69.9158 19.2399V13.1348H67.8818V11.8932H69.9158V9.16136H71.2727V11.8932H74.0472V13.1348Z" fill="white"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M75.8965 5.9334H77.2528V13.4451H77.2936C77.4447 13.1835 77.6367 12.9414 77.8689 12.7209C78.1023 12.5005 78.362 12.3106 78.6503 12.1516C78.9374 11.9936 79.2427 11.8691 79.5647 11.7792C79.8862 11.6897 80.2045 11.6448 80.5203 11.6448C81.7537 11.6448 82.6644 11.9728 83.2543 12.628C83.8421 13.2835 84.1374 14.2181 84.1374 15.4318V21.5779H82.781V16.2186C82.781 15.1424 82.5957 14.318 82.2255 13.7453C81.8567 13.1728 81.1707 12.8865 80.1711 12.8865C80.1027 12.8865 79.9105 12.9143 79.595 12.9693C79.2804 13.0244 78.9484 13.1759 78.5985 13.4244C78.2496 13.6728 77.9375 14.0453 77.6641 14.5419C77.3894 15.0389 77.2528 15.7285 77.2528 16.6115V21.5779H75.8965V5.9334Z" fill="white"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M94.8035 15.9906C94.8035 15.0668 94.5289 14.3181 93.9815 13.7453C93.4335 13.1728 92.666 12.8866 91.6799 12.8866C91.2414 12.8866 90.816 12.973 90.4056 13.1452C89.9943 13.3182 89.6349 13.5489 89.3265 13.8382C89.0181 14.1284 88.7715 14.4593 88.5868 14.832C88.4015 15.2044 88.309 15.5909 88.309 15.9906H94.8035ZM88.2678 17.108C88.309 17.5913 88.4257 18.0463 88.6173 18.4741C88.8096 18.9021 89.0624 19.2706 89.3773 19.5811C89.6929 19.8917 90.0561 20.1368 90.4673 20.3159C90.8775 20.4953 91.3235 20.5852 91.8032 20.5852C92.529 20.5852 93.1563 20.4164 93.6832 20.0777C94.2113 19.7402 94.6107 19.3502 94.8854 18.9086L95.9343 19.7775C95.3581 20.5095 94.724 21.0336 94.0327 21.3507C93.3404 21.6674 92.5974 21.8265 91.8032 21.8265C91.09 21.8265 90.4294 21.6985 89.8195 21.444C89.2092 21.1882 88.686 20.8331 88.2473 20.3775C87.8085 19.9224 87.4632 19.3848 87.2096 18.7641C86.9558 18.1428 86.8291 17.4672 86.8291 16.7358C86.8291 16.0049 86.9524 15.3284 87.1992 14.7078C87.4461 14.0868 87.7879 13.5488 88.2267 13.0929C88.6654 12.6381 89.1791 12.2833 89.7684 12.0278C90.3572 11.7726 90.9942 11.6447 91.6799 11.6447C92.4055 11.6447 93.0568 11.7762 93.632 12.038C94.2075 12.3006 94.6912 12.6484 95.0807 13.0832C95.4714 13.5177 95.7695 14.0283 95.9751 14.6147C96.1805 15.2011 96.2835 15.8252 96.2835 16.4874V17.108H88.2678Z" fill="white"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M100.045 11.8932C100.072 12.1554 100.089 12.4143 100.096 12.6691C100.103 12.9244 100.107 13.1835 100.107 13.4451H100.148C100.299 13.1835 100.491 12.9413 100.723 12.7209C100.956 12.5004 101.216 12.3106 101.504 12.1516C101.792 11.9936 102.097 11.8691 102.419 11.7792C102.741 11.6896 103.059 11.6447 103.375 11.6447C104.608 11.6447 105.518 11.9728 106.108 12.628C106.697 13.2834 106.991 14.2181 106.991 15.4318V21.5778H105.635V16.2186C105.635 15.1423 105.45 14.318 105.08 13.7452C104.711 13.1728 104.025 12.8865 103.025 12.8865C102.956 12.8865 102.765 12.9143 102.449 12.9693C102.134 13.0244 101.802 13.1759 101.453 13.4243C101.104 13.6727 100.792 14.0452 100.518 14.5418C100.244 15.0389 100.107 15.7284 100.107 16.6115V21.5778H98.75V14.0245C98.75 13.7626 98.7401 13.4318 98.7195 13.0312C98.6989 12.6315 98.6748 12.252 98.6475 11.8932H100.045Z" fill="white"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M115.644 16.7564C115.301 16.7564 114.873 16.7743 114.36 16.8082C113.845 16.8427 113.353 16.9257 112.88 17.0565C112.407 17.1878 112.003 17.3908 111.667 17.6667C111.331 17.9429 111.164 18.3223 111.164 18.8052C111.164 19.1226 111.228 19.3952 111.359 19.6226C111.489 19.8501 111.664 20.0362 111.883 20.181C112.102 20.3262 112.345 20.4296 112.613 20.4918C112.88 20.5534 113.151 20.5851 113.424 20.5851C113.917 20.5851 114.346 20.5025 114.709 20.3366C115.071 20.1707 115.377 19.9469 115.623 19.6641C115.87 19.3812 116.052 19.0504 116.168 18.6705C116.285 18.2915 116.343 17.8877 116.343 17.4596V16.7564H115.644ZM116.343 15.6392V15.3905C116.343 13.7216 115.521 12.8865 113.876 12.8865C112.753 12.8865 111.773 13.2662 110.937 14.0245L110.116 13.0519C111.02 12.1139 112.376 11.6447 114.185 11.6447C114.65 11.6447 115.099 11.7137 115.531 11.8518C115.963 11.9899 116.335 12.2006 116.651 12.4829C116.966 12.7656 117.219 13.1213 117.412 13.5488C117.603 13.9765 117.699 14.4871 117.699 15.0801V19.405C117.699 19.7775 117.716 20.1675 117.75 20.5745C117.784 20.9818 117.822 21.3165 117.864 21.5778H116.549C116.508 21.3434 116.477 21.0889 116.456 20.8127C116.435 20.5364 116.424 20.2678 116.424 20.0054H116.384C115.986 20.654 115.517 21.1197 114.976 21.4018C114.435 21.6848 113.773 21.8264 112.993 21.8264C112.568 21.8264 112.157 21.7676 111.76 21.6505C111.362 21.5332 111.01 21.3541 110.701 21.1124C110.393 20.8712 110.146 20.5745 109.962 20.2228C109.776 19.8709 109.684 19.4605 109.684 18.9916C109.684 18.2046 109.886 17.5875 110.291 17.1393C110.694 16.6912 111.201 16.3566 111.811 16.1357C112.42 15.9148 113.071 15.7768 113.763 15.7215C114.456 15.6668 115.089 15.6392 115.665 15.6392H116.343Z" fill="white"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M5 23.6337L14.8124 24.7543C14.6417 23.8788 14.5502 22.9763 14.5502 22.0512C14.5502 20.395 14.839 18.8062 15.3653 17.3305C14.0308 16.404 12.866 15.2482 11.9232 13.9208L5 23.6337Z" fill="white"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M31.7624 26.6896L28.5597 18.7333C26.9192 19.4197 25.1223 19.7999 23.2393 19.7999C20.9211 19.7999 18.735 19.2229 16.8108 18.2086C16.416 19.4191 16.1992 20.7099 16.1992 22.0512C16.1992 23.0506 16.3211 24.0209 16.5445 24.9524L31.7624 26.6896Z" fill="white"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M29.3223 16.6913L26.5002 9.6601L25.106 10.101C21.7502 11.1782 18.9465 13.5345 17.4326 16.663C19.1617 17.6039 21.1407 18.1393 23.2404 18.1393C24.9046 18.1393 26.4706 17.7309 28.0245 17.1846L28.9971 16.8421" fill="white"/>
  <mask id="adthena-logo-mask" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="12" y="0" width="13" height="16">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.9463 0.742916H24.4924V15.7711H12.9463V0.742916Z" fill="white"/>
  </mask>
  <g mask="url(#adthena-logo-mask)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M24.4924 8.63125L21.3162 0.742916L12.9463 12.4849C13.7677 13.762 14.8144 14.8768 16.0329 15.7711C17.7417 12.3573 20.7963 9.74025 24.4924 8.63125Z" fill="white"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.3601 17.3337C14.0279 16.4086 12.8644 15.2546 11.9228 13.9297L10.3193 16.1804C11.0905 17.0766 11.9717 17.8748 12.9441 18.5503C12.4184 20.0246 12.1304 21.6103 12.1304 23.2639C12.1304 23.6626 12.1507 24.0568 12.1838 24.447L14.8083 24.7465C14.6379 23.8726 14.5462 22.9713 14.5462 22.0475C14.5462 20.3939 14.8344 18.8075 15.3601 17.3337Z" fill="white"/>
  </g>
</svg>
```

---

## Dummy Data Conventions

- **Domains:** booking.com, bt.com, admiral.com, comparethemarket.com, autotrader.co.uk
- **Industries (14):** Automotive, Broadband, Car Insurance, Cosmetics, Electronics, Fashion, Home Insurance, Luxury Goods, Personal Banking, Pharma, Travel, Telecom, Energy, Financial Services
- **Countries:** USA, UK, Germany, France, Australia
- **Change badges:** `+n` green `#40af46` / `-n` red `#de5a5a`
- **Dates:** `28 Feb, 2026` or `14 Nov, 2025`
- **Pending features:** end callout copy with `<span class="font-semibold">Coming soon.</span>`

---

## Vocabulary

| Term | Meaning |
|---|---|
| AIO | AI Overview — Google's AI-generated search summaries |
| ChatGPT Ads | Ads appearing inside ChatGPT responses |
| Arlo | Adthena's AI assistant |
| Industry Landscape | Market-level ChatGPT ads view |
| Account Report | Per-account ChatGPT ads performance |
| Ad Frequency | % share of observed ad placements |
| Intent type | Query intent category: Recommend, Compare, Plan… |
| Signal chip | Labelled badge for an insight category (e.g. "AIO Efficiency Risk") |
| Priority pill | High / Medium / Strong tier indicator |
