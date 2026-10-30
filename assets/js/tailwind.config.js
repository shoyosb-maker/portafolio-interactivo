tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Two-theme neutral scale (see tokens.css). Alpha works on every entry,
        // so `bg-canvas/80` or `border-ink/[0.07]` resolve per theme.
        canvas:   "rgb(var(--canvas-rgb) / <alpha-value>)",
        surface1: "rgb(var(--surface1-rgb) / <alpha-value>)",
        surface2: "rgb(var(--surface2-rgb) / <alpha-value>)",
        ink:      "rgb(var(--ink-rgb) / <alpha-value>)",
        ink2:     "rgb(var(--ink2-rgb) / <alpha-value>)",
        ink3:     "rgb(var(--ink3-rgb) / <alpha-value>)",
        ink4:     "rgb(var(--ink4-rgb) / <alpha-value>)",
        ink5:     "rgb(var(--ink5-rgb) / <alpha-value>)",
        accent:   "rgb(var(--accent-rgb) / <alpha-value>)",

        // Legacy names kept so existing markup keeps resolving
        deep:     "rgb(var(--canvas-rgb) / <alpha-value>)",
        mid:      "rgb(var(--surface1-rgb) / <alpha-value>)",
        surf1:    "rgb(var(--surface1-rgb) / <alpha-value>)",
        surf2:    "rgb(var(--surface2-rgb) / <alpha-value>)",
        surf3:    "rgb(var(--surface3-rgb) / <alpha-value>)",
        surf4:    "rgb(var(--surface4-rgb) / <alpha-value>)",
        onvar:    "rgb(var(--ink3-rgb) / <alpha-value>)",
        outline1: "rgb(var(--ink4-rgb) / <alpha-value>)",
        outlinev: "rgb(var(--line-strong-rgb) / <alpha-value>)",
        card:     "rgb(var(--surface1-rgb) / 0.82)",
        inner:    "rgb(var(--surface2-rgb) / 0.65)",
        spec:     "rgb(var(--ink-rgb) / 0.12)",
        bsubtle:  "rgb(var(--ink-rgb) / 0.07)",
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      letterSpacing: {
        label: "0.06em",
      },
    },
  },
};