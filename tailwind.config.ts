const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette")

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "hsl(240, 3%, 6%)",
        foreground: "hsl(0, 0%, 98%)",
        card: "hsl(270, 6%, 7%)",
        "card-foreground": "hsl(0, 0%, 98%)",
        popover: "hsl(270, 6%, 7%)",
        "popover-foreground": "hsl(0, 0%, 98%)",
        primary: "hsl(256, 85%, 57%)",
        "primary-foreground": "hsl(0, 0%, 98%)",
        secondary: "hsl(255, 5%, 15%)",
        "secondary-foreground": "hsl(0, 0%, 98%)",
        muted: "hsl(260, 5%, 22%)",
        "muted-foreground": "hsl(255, 5%, 49%)",
        accent: "hsl(256, 45%, 14%)",
        "accent-foreground": "hsl(0, 0%, 98%)",
        destructive: "hsl(0, 84%, 60%)",
        "destructive-foreground": "hsl(0, 0%, 98%)",
        border: "hsl(260, 5%, 12%)",
        input: "hsl(255, 4%, 18%)",
        ring: "hsl(256, 84%, 40%)",
        radius: "0.5rem",
      },
      boxShadow: {
        input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
      },
    },
  },
  plugins: [addVariablesForColors],
}

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"))
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  )

  addBase({
    ":root": newVars,
  })
}
