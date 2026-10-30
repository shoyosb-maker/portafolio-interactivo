tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Neutral scale (see tokens.css) — hierarchy comes from opacity, not from hues
        deep: "#0b0b0c",
        mid: "#111113",
        card: "rgba(17,17,19,0.82)",
        inner: "rgba(23,23,26,0.65)",
        spec: "rgba(237,237,239,0.12)",
        bsubtle: "rgba(237,237,239,0.07)",
        accent: "#6ee7b7",
        outline1: "#8a8a93",
        outlinev: "#2e2e33",
        surf1: "#141416",
        surf2: "#17171a",
        surf3: "#1d1d21",
        surf4: "#26262b",
        onvar: "#b4b4bc",
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