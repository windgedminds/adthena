import tokens, {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
} from "../../styles/design-tokens";

// ─── helpers ────────────────────────────────────────────────────────────────

function SectionHeader({ title }: { title: string }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h2
        style={{
          fontFamily: tokens.typography.fontFamily.base,
          fontSize: 20,
          fontWeight: 600,
          color: colors.text.primaryVar,
          margin: 0,
          marginBottom: 8,
        }}
      >
        {title}
      </h2>
      <div
        style={{
          height: 1,
          background: colors.grey[200],
        }}
      />
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginBottom: 56 }}>
      <SectionHeader title={title} />
      {children}
    </section>
  );
}

function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: tokens.typography.fontFamily.base,
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: colors.text.secondaryVar,
        margin: "0 0 12px",
      }}
    >
      {children}
    </p>
  );
}

// ─── color swatch ───────────────────────────────────────────────────────────

function Swatch({
  name,
  value,
  dark = false,
}: {
  name: string;
  value: string;
  dark?: boolean;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 84 }}>
      <div
        style={{
          width: 84,
          height: 48,
          borderRadius: borderRadius.sm,
          background: value,
          border: `1px solid ${colors.grey[200]}`,
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontFamily: tokens.typography.fontFamily.base,
          fontSize: 11,
          fontWeight: 600,
          color: colors.text.primaryVar,
        }}
      >
        {name}
      </span>
      <span
        style={{
          fontFamily: tokens.typography.fontFamily.base,
          fontSize: 10,
          color: colors.text.secondaryVar,
        }}
      >
        {value}
      </span>
    </div>
  );
}

function SwatchRow({
  label,
  swatches,
}: {
  label: string;
  swatches: { name: string; value: string }[];
}) {
  return (
    <div style={{ marginBottom: 32 }}>
      <SubLabel>{label}</SubLabel>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        {swatches.map((s) => (
          <Swatch key={s.name} name={s.name} value={s.value} />
        ))}
      </div>
    </div>
  );
}

// ─── COLORS page ────────────────────────────────────────────────────────────

function ColorsSection() {
  return (
    <Section title="Colors">
      <SwatchRow
        label="Primary — variable collection"
        swatches={[
          { name: "primary.main", value: colors.primary.main },
          { name: "primary.medium", value: colors.primary.medium },
          { name: "primary.bright", value: colors.primary.bright },
          { name: "primary.pageBg", value: colors.primary.pageBg },
        ]}
      />
      <SwatchRow
        label="Primary fill styles (component-level)"
        swatches={[
          { name: "fill.main", value: colors.fill.main },
          { name: "fill.dark", value: colors.fill.dark },
          { name: "fill.light", value: colors.fill.light },
          { name: "fill.contrast", value: colors.fill.contrast },
        ]}
      />
      <SwatchRow
        label="States"
        swatches={[
          { name: "selectedSoft", value: colors.states.selectedSoft },
          { name: "containedHover", value: colors.states.containedHover },
          { name: "outlinedHoverBg", value: colors.states.outlinedHoverBg },
          { name: "restingBorder", value: colors.states.restingBorder },
        ]}
      />
      <SwatchRow
        label="Text"
        swatches={[
          { name: "text.primary", value: colors.text.primary },
          { name: "text.secondary", value: colors.text.secondary },
          { name: "text.disabled", value: colors.text.disabled },
          { name: "text.primaryVar", value: colors.text.primaryVar },
          { name: "text.secondaryVar", value: colors.text.secondaryVar },
          { name: "text.disabledVar", value: colors.text.disabledVar },
        ]}
      />
      <SwatchRow
        label="Alerts — Semantic"
        swatches={[
          { name: "warning.main", value: colors.warning.main },
          { name: "warning.bg", value: colors.warning.bg },
          { name: "error.main", value: colors.error.main },
          { name: "error.bg", value: colors.error.bg },
        ]}
      />
      <SwatchRow
        label="Backgrounds & Surfaces"
        swatches={[
          { name: "bg.page", value: colors.bg.page },
          { name: "bg.paper", value: colors.bg.paper },
          { name: "bg.default", value: colors.bg.default },
        ]}
      />
      <SwatchRow
        label="Action States"
        swatches={[
          { name: "active", value: colors.action.active },
          { name: "hover", value: colors.action.hover },
          { name: "selected", value: colors.action.selected },
          { name: "disabled", value: colors.action.disabled },
          { name: "disabledBg", value: colors.action.disabledBg },
        ]}
      />

      {/* Chart series */}
      <div style={{ marginBottom: 32 }}>
        <SubLabel>Chart Series — Polychromatic (index order)</SubLabel>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {colors.chart.map((hex, i) => {
            const labels = [
              "01 purple","02 blue","03 magenta","04 crimson","05 green",
              "06 teal","07 orange","08 red","09 navy","10 brown","11 olive","neutral",
            ];
            return <Swatch key={i} name={labels[i]} value={hex} />;
          })}
        </div>
      </div>

      {/* Grey scale */}
      <div style={{ marginBottom: 32 }}>
        <SubLabel>Grey Scale — Extended (custom half-steps 350, 450, 550, 650, 750, 850, 950)</SubLabel>
        <div style={{ display: "flex", gap: 4 }}>
          {(Object.entries(colors.grey) as [string, string][]).map(([step, hex]) => (
            <div key={step} style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
              <div
                style={{
                  width: 48,
                  height: 32,
                  borderRadius: 3,
                  background: hex,
                  border: `1px solid ${colors.grey[200]}`,
                }}
              />
              <span
                style={{
                  fontFamily: tokens.typography.fontFamily.base,
                  fontSize: 9,
                  color: colors.text.secondaryVar,
                }}
              >
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── TYPOGRAPHY page ─────────────────────────────────────────────────────────

function TypographySection() {
  const headingRows: { token: string; label: string; meta: string; sample: string }[] = [
    { token: "hxxl", label: "HXXL",  meta: "96px · SemiBold · lh 112%", sample: "Display XXL" },
    { token: "hxl",  label: "HXL",   meta: "60px · SemiBold · lh 120%", sample: "Display XL" },
    { token: "hl",   label: "HL",    meta: "48px · SemiBold · lh 116%", sample: "Heading Large" },
    { token: "hm",   label: "HM",    meta: "34px · SemiBold · lh 123%", sample: "Heading Medium" },
    { token: "hs",   label: "HS",    meta: "24px · SemiBold · lh 133%", sample: "Heading Small" },
    { token: "hxs",  label: "HXS",   meta: "20px · SemiBold · lh 120%", sample: "Heading XS" },
  ];

  const bodyRows: { label: string; meta: string; sample: string; style: React.CSSProperties }[] = [
    { label: "Body 16",      meta: "16px · Regular · lh 150%",  sample: "Standard body copy at 16px.", style: { fontSize: 16, fontWeight: 400, lineHeight: "150%" } },
    { label: "Body 16 Bold", meta: "16px · SemiBold · lh 150%", sample: "Semibold body — labels and emphasis.", style: { fontSize: 16, fontWeight: 600, lineHeight: "150%" } },
    { label: "Body 14",      meta: "14px · Regular · lh 143%",  sample: "Body at 14px — data tables and cards.", style: { fontSize: 14, fontWeight: 400, lineHeight: "143%" } },
    { label: "Body 14 Bold", meta: "14px · SemiBold · lh 143%", sample: "Column headers, callout text.", style: { fontSize: 14, fontWeight: 600, lineHeight: "143%" } },
    { label: "Subtitle 16",  meta: "16px · Regular · lh 175%",  sample: "Subtitle — section descriptions.", style: { fontSize: 16, fontWeight: 400, lineHeight: "175%" } },
    { label: "Subtitle 14",  meta: "14px · Regular · lh 157%",  sample: "Subtitle — chart captions.", style: { fontSize: 14, fontWeight: 400, lineHeight: "157%" } },
    { label: "Caption",      meta: "12px · Regular · lh 13px",  sample: "Supporting caption or metadata text.", style: { fontSize: 12, fontWeight: 400, lineHeight: "13px" } },
    { label: "Overline",     meta: "12px · Regular · lh 266%",  sample: "OVERLINE — UPPERCASE LABEL", style: { fontSize: 12, fontWeight: 400, lineHeight: "266%", textTransform: "uppercase", letterSpacing: "0.08em" } },
  ];

  const componentRows: { label: string; meta: string; sample: string; style: React.CSSProperties }[] = [
    { label: "Button Lg",    meta: "15px · SemiBold · lh 26px", sample: "BUTTON LARGE",      style: { fontSize: 15, fontWeight: 600, lineHeight: "26px", textTransform: "uppercase" } },
    { label: "Button Md",    meta: "14px · SemiBold · lh 24px", sample: "BUTTON MEDIUM",     style: { fontSize: 14, fontWeight: 600, lineHeight: "24px", textTransform: "uppercase" } },
    { label: "Button Sm",    meta: "13px · SemiBold · lh 22px", sample: "button small",      style: { fontSize: 13, fontWeight: 600, lineHeight: "22px" } },
    { label: "Input Text",   meta: "14px · Regular · lh 24px",  sample: "Input field value text", style: { fontSize: 14, fontWeight: 400, lineHeight: "24px" } },
    { label: "Table Header", meta: "14px · SemiBold · lh 24px", sample: "Column Header",     style: { fontSize: 14, fontWeight: 600, lineHeight: "24px" } },
    { label: "Chip",         meta: "12px · SemiBold · lh 12px", sample: "Chip Label",        style: { fontSize: 12, fontWeight: 600, lineHeight: "12px" } },
    { label: "Badge Label",  meta: "12px · SemiBold · lh 20px", sample: "99+",               style: { fontSize: 12, fontWeight: 600, lineHeight: "20px" } },
    { label: "Tooltip",      meta: "10px · Regular · lh 14px",  sample: "Tooltip content text", style: { fontSize: 10, fontWeight: 400, lineHeight: "14px" } },
  ];

  const rowStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "190px 1fr",
    alignItems: "center",
    borderBottom: `1px solid ${colors.grey[100]}`,
    padding: "10px 0",
    gap: 24,
  };

  const metaStyle: React.CSSProperties = {
    fontFamily: tokens.typography.fontFamily.base,
    fontSize: 11,
    color: colors.text.secondaryVar,
    marginTop: 2,
  };

  return (
    <Section title="Typography">
      {/* Font family */}
      <div style={{ marginBottom: 32 }}>
        <SubLabel>Font Families</SubLabel>
        <div
          style={{
            padding: 20,
            background: colors.bg.paper,
            border: shadows.outlined,
            borderRadius: borderRadius.xl,
          }}
        >
          <p
            style={{
              fontFamily: tokens.typography.fontFamily.base,
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: colors.text.secondaryVar,
              margin: "0 0 8px",
            }}
          >
            BASE — OPEN SANS
          </p>
          <p
            style={{
              fontFamily: tokens.typography.fontFamily.base,
              fontSize: 36,
              color: colors.text.primaryVar,
              margin: "0 0 12px",
            }}
          >
            Aa Bb Cc 123 !?
          </p>
          <div style={{ display: "flex", gap: 24 }}>
            {[
              { label: "Light 300", weight: 300 },
              { label: "Regular 400", weight: 400 },
              { label: "SemiBold 600", weight: 600 },
              { label: "Bold 700", weight: 700 },
            ].map(({ label, weight }) => (
              <span
                key={label}
                style={{
                  fontFamily: tokens.typography.fontFamily.base,
                  fontSize: 13,
                  fontWeight: weight,
                  color: colors.text.primaryVar,
                }}
              >
                {label}
              </span>
            ))}
          </div>
          <p
            style={{
              fontFamily: tokens.typography.fontFamily.base,
              fontSize: 11,
              color: colors.text.secondaryVar,
              marginTop: 12,
              marginBottom: 0,
            }}
          >
            'Open Sans', Helvetica, sans-serif
          </p>
        </div>
      </div>

      {/* Heading scale */}
      <div style={{ marginBottom: 32 }}>
        <SubLabel>Heading Scale</SubLabel>
        {headingRows.map(({ token, label, meta, sample }) => {
          const s = typography.heading[token as keyof typeof typography.heading];
          return (
            <div key={token} style={rowStyle}>
              <div>
                <span
                  style={{
                    fontFamily: tokens.typography.fontFamily.base,
                    fontSize: 12,
                    fontWeight: 600,
                    color: colors.text.primaryVar,
                  }}
                >
                  {label}
                </span>
                <p style={metaStyle}>{meta}</p>
              </div>
              <span
                style={{
                  fontFamily: tokens.typography.fontFamily.base,
                  fontSize: s.fontSize,
                  fontWeight: s.fontWeight,
                  lineHeight: s.lineHeight,
                  color: colors.text.primaryVar,
                }}
              >
                {sample}
              </span>
            </div>
          );
        })}
      </div>

      {/* Body & UI scale */}
      <div style={{ marginBottom: 32 }}>
        <SubLabel>Body & UI Scale</SubLabel>
        {bodyRows.map(({ label, meta, sample, style }) => (
          <div key={label} style={rowStyle}>
            <div>
              <span
                style={{
                  fontFamily: tokens.typography.fontFamily.base,
                  fontSize: 12,
                  fontWeight: 600,
                  color: colors.text.primaryVar,
                }}
              >
                {label}
              </span>
              <p style={metaStyle}>{meta}</p>
            </div>
            <span
              style={{
                fontFamily: tokens.typography.fontFamily.base,
                color: colors.text.primaryVar,
                ...style,
              }}
            >
              {sample}
            </span>
          </div>
        ))}
      </div>

      {/* Component styles */}
      <div>
        <SubLabel>Component Styles</SubLabel>
        {componentRows.map(({ label, meta, sample, style }) => (
          <div key={label} style={rowStyle}>
            <div>
              <span
                style={{
                  fontFamily: tokens.typography.fontFamily.base,
                  fontSize: 12,
                  fontWeight: 600,
                  color: colors.text.primaryVar,
                }}
              >
                {label}
              </span>
              <p style={metaStyle}>{meta}</p>
            </div>
            <span
              style={{
                fontFamily: tokens.typography.fontFamily.base,
                color: colors.text.primaryVar,
                ...style,
              }}
            >
              {sample}
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ─── SPACING page ────────────────────────────────────────────────────────────

function SpacingSection() {
  const numericScale = [
    [0, "0px"], [0.5, "2px"], [1, "4px"], [1.5, "6px"], [2, "8px"],
    [2.5, "10px"], [3, "12px"], [4, "16px"], [5, "20px"], [6, "24px"],
    [7, "28px"], [8, "32px"], [9, "36px"], [10, "40px"],
    [12, "48px"], [14, "56px"], [16, "64px"], [20, "80px"],
  ] as [number, string][];

  const semanticAliases = [
    { name: "pagePadding",        value: "24px",   desc: "Page outer padding" },
    { name: "cardGap",            value: "16px",   desc: "Gap between cards" },
    { name: "cardPadding",        value: "24px",   desc: "Card inner padding" },
    { name: "cardPaddingCompact", value: "16px",   desc: "KPI card padding" },
    { name: "appBarHeight",       value: "50px",   desc: "Global app bar height" },
    { name: "sidebarWidth",       value: "254px",  desc: "Navigation sidebar width" },
    { name: "contentLeftOffset",  value: "278px",  desc: "Sidebar + 24px gap" },
    { name: "contentMax",         value: "1200px", desc: "Content column max-width" },
  ];

  return (
    <Section title="Spacing — Tailwind-aligned (1 unit = 4px)">
      <div style={{ marginBottom: 32 }}>
        <SubLabel>Numeric Scale</SubLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {numericScale.map(([unit, px]) => (
            <div key={unit} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span
                style={{
                  fontFamily: tokens.typography.fontFamily.base,
                  fontSize: 12,
                  fontWeight: 600,
                  color: colors.text.primaryVar,
                  width: 28,
                  textAlign: "right",
                  flexShrink: 0,
                }}
              >
                {unit}
              </span>
              <div
                style={{
                  height: 12,
                  width: px,
                  background: colors.primary.bright,
                  borderRadius: 2,
                  flexShrink: 0,
                  minWidth: 3,
                }}
              />
              <span
                style={{
                  fontFamily: tokens.typography.fontFamily.base,
                  fontSize: 11,
                  color: colors.text.secondaryVar,
                }}
              >
                {px}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SubLabel>Semantic Aliases</SubLabel>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "200px 80px 1fr",
            gap: "8px 16px",
          }}
        >
          <span style={{ fontFamily: tokens.typography.fontFamily.base, fontSize: 10, fontWeight: 700, color: colors.text.secondaryVar, textTransform: "uppercase", letterSpacing: "0.06em" }}>Token</span>
          <span style={{ fontFamily: tokens.typography.fontFamily.base, fontSize: 10, fontWeight: 700, color: colors.text.secondaryVar, textTransform: "uppercase", letterSpacing: "0.06em" }}>Value</span>
          <span style={{ fontFamily: tokens.typography.fontFamily.base, fontSize: 10, fontWeight: 700, color: colors.text.secondaryVar, textTransform: "uppercase", letterSpacing: "0.06em" }}>Description</span>
          {semanticAliases.map(({ name, value, desc }) => (
            <>
              <span key={`n-${name}`} style={{ fontFamily: tokens.typography.fontFamily.base, fontSize: 13, fontWeight: 600, color: colors.primary.main }}>{name}</span>
              <span key={`v-${name}`} style={{ fontFamily: tokens.typography.fontFamily.base, fontSize: 13, color: colors.text.primaryVar }}>{value}</span>
              <span key={`d-${name}`} style={{ fontFamily: tokens.typography.fontFamily.base, fontSize: 13, color: colors.text.secondaryVar }}>{desc}</span>
            </>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── BORDER RADIUS page ──────────────────────────────────────────────────────

function BorderRadiusSection() {
  const radii = [
    { name: "none",   value: borderRadius.none,   usage: "" },
    { name: "sm",     value: borderRadius.sm,     usage: "" },
    { name: "md",     value: borderRadius.md,     usage: "tooltip" },
    { name: "lg",     value: borderRadius.lg,     usage: "nav card" },
    { name: "xl",     value: borderRadius.xl,     usage: "ALL cards ← universal" },
    { name: "full",   value: borderRadius.full,   usage: "pills, chips" },
    { name: "circle", value: borderRadius.circle, usage: "avatars" },
  ];

  return (
    <Section title="Border Radius">
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
        {radii.map(({ name, value, usage }) => (
          <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 80,
                height: 80,
                background: colors.primary.pageBg,
                border: `2px solid ${colors.primary.medium}`,
                borderRadius: name === "circle" ? "50%" : value,
              }}
            />
            <span
              style={{
                fontFamily: tokens.typography.fontFamily.base,
                fontSize: 12,
                fontWeight: 600,
                color: colors.text.primaryVar,
              }}
            >
              {name}
            </span>
            <span
              style={{
                fontFamily: tokens.typography.fontFamily.base,
                fontSize: 11,
                color: colors.text.secondaryVar,
              }}
            >
              {value}
            </span>
            {usage && (
              <span
                style={{
                  fontFamily: tokens.typography.fontFamily.base,
                  fontSize: 10,
                  color: colors.primary.main,
                  textAlign: "center",
                }}
              >
                {usage}
              </span>
            )}
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 24,
          padding: "12px 16px",
          background: colors.states.selectedSoft,
          borderRadius: borderRadius.lg,
          borderLeft: `3px solid ${colors.primary.main}`,
        }}
      >
        <p
          style={{
            fontFamily: tokens.typography.fontFamily.base,
            fontSize: 13,
            color: colors.text.primaryVar,
            margin: 0,
          }}
        >
          <strong>Rule:</strong> All cards, callout boxes, insight panels → <code>xl (12px)</code> without exception.
          Filter pills and chips → <code>full (200px)</code>. Avatars and icon circles → <code>circle (50%)</code>.
        </p>
      </div>
    </Section>
  );
}

// ─── SHADOWS page ────────────────────────────────────────────────────────────

function ShadowsSection() {
  const elevations = [
    { name: "none",     value: shadows.none,     desc: "No shadow" },
    { name: "outlined", value: shadows.outlined, desc: "Elevation/Outlined — card borders" },
    { name: "card",     value: shadows.card,     desc: "Elevation — standard card" },
    { name: "modal",    value: shadows.modal,    desc: "Elevation/Modals" },
    { name: "heroCard", value: shadows.heroCard,  desc: "Hero Card Elevation" },
  ];

  return (
    <Section title="Shadows — Elevation Effect Styles">
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
        {elevations.map(({ name, value, desc }) => (
          <div key={name} style={{ width: 184 }}>
            <div
              style={{
                width: 152,
                height: 88,
                background: colors.bg.paper,
                borderRadius: borderRadius.xl,
                boxShadow: value,
                margin: "0 auto 12px",
              }}
            />
            <p
              style={{
                fontFamily: tokens.typography.fontFamily.base,
                fontSize: 13,
                fontWeight: 600,
                color: colors.text.primaryVar,
                margin: "0 0 4px",
              }}
            >
              {name}
            </p>
            <p
              style={{
                fontFamily: tokens.typography.fontFamily.base,
                fontSize: 11,
                color: colors.text.secondaryVar,
                margin: "0 0 4px",
              }}
            >
              {desc}
            </p>
            <code
              style={{
                fontFamily: "monospace",
                fontSize: 10,
                color: colors.text.secondaryVar,
                wordBreak: "break-all",
              }}
            >
              {value}
            </code>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 32,
          padding: "12px 16px",
          background: colors.states.selectedSoft,
          borderRadius: borderRadius.lg,
          borderLeft: `3px solid ${colors.primary.main}`,
        }}
      >
        <p
          style={{
            fontFamily: tokens.typography.fontFamily.base,
            fontSize: 13,
            color: colors.text.primaryVar,
            margin: 0,
          }}
        >
          <strong>Rule:</strong> Standard cards → <code>none</code>. Modal overlays → <code>modal</code>.
          Hero KPI cards → <code>none</code>. Background blur uses <code>backdrop-filter: blur(10px)</code> — not a box-shadow.
        </p>
      </div>
    </Section>
  );
}

// ─── BREAKPOINTS section ─────────────────────────────────────────────────────

function BreakpointsSection() {
  const bps = Object.entries(tokens.breakpoints) as [string, string][];
  return (
    <Section title="Breakpoints">
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {bps.map(([name, value]) => (
          <div
            key={name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: "10px 16px",
              background: colors.bg.paper,
              borderRadius: borderRadius.lg,
              boxShadow: shadows.outlined,
            }}
          >
            <span
              style={{
                fontFamily: tokens.typography.fontFamily.base,
                fontSize: 13,
                fontWeight: 600,
                color: colors.primary.main,
                width: 40,
              }}
            >
              {name}
            </span>
            <span
              style={{
                fontFamily: tokens.typography.fontFamily.base,
                fontSize: 13,
                color: colors.text.primaryVar,
                width: 60,
              }}
            >
              {value}
            </span>
            <div
              style={{
                height: 6,
                flex: 1,
                background: colors.grey[100],
                borderRadius: borderRadius.full,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${(parseInt(value) / 1536) * 100}%`,
                  background: `linear-gradient(90deg, ${colors.primary.main}, ${colors.primary.bright})`,
                  borderRadius: borderRadius.full,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ─── ROOT PAGE ───────────────────────────────────────────────────────────────

export default function StyleGuidePage() {
  return (
    <div
      style={{
        background: colors.bg.page,
        minHeight: "100vh",
        fontFamily: tokens.typography.fontFamily.base,
      }}
    >
      {/* Header */}
      <div
        style={{
          background: colors.fill.main,
          color: colors.fill.contrast,
          padding: "24px 40px",
          marginBottom: 40,
        }}
      >
        <h1
          style={{
            fontFamily: tokens.typography.fontFamily.base,
            fontSize: 24,
            fontWeight: 600,
            margin: 0,
            lineHeight: "133%",
          }}
        >
          Adthena Design System
        </h1>
        <p
          style={{
            fontFamily: tokens.typography.fontFamily.base,
            fontSize: 14,
            margin: "4px 0 0",
            opacity: 0.8,
          }}
        >
          Visual Style Guide · Figma ATHENA_DS · Claude DS
        </p>
      </div>

      {/* Content */}
      <div
        style={{
          maxWidth: spacing.semantic.contentMax,
          margin: "0 auto",
          padding: `0 ${spacing.semantic.pagePadding} 80px`,
        }}
      >
        <ColorsSection />
        <TypographySection />
        <SpacingSection />
        <BorderRadiusSection />
        <ShadowsSection />
        <BreakpointsSection />
      </div>
    </div>
  );
}
