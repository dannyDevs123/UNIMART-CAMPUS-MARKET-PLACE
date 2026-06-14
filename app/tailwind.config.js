/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // UniMart custom colors
        surface: {
          DEFAULT: "#f8f9ff",
          dim: "#cbdbf5",
          bright: "#f8f9ff",
        },
        "surface-container": {
          lowest: "#ffffff",
          low: "#eff4ff",
          DEFAULT: "#e5eeff",
          high: "#dce9ff",
          highest: "#d3e4fe",
        },
        "on-surface": {
          DEFAULT: "#0b1c30",
          variant: "#464553",
        },
        "inverse-surface": "#213145",
        "inverse-on-surface": "#eaf1ff",
        outline: {
          DEFAULT: "#777584",
          variant: "#c8c4d5",
        },
        "surface-tint": "#544fc0",
        "on-primary": {
          DEFAULT: "#ffffff",
          container: "#a9a7ff",
        },
        "primary-container": "#3730a3",
        "inverse-primary": "#c3c0ff",
        "secondary-container": "#8792fe",
        "on-secondary": {
          DEFAULT: "#ffffff",
          container: "#17228f",
        },
        "on-tertiary": {
          DEFAULT: "#ffffff",
          container: "#fe9562",
        },
        "tertiary-container": "#752c00",
        success: {
          DEFAULT: "#059669",
          foreground: "#ffffff",
        },
        error: {
          DEFAULT: "#ba1a1a",
          container: "#ffdad6",
          foreground: "#ffffff",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-lg": ["48px", { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-lg-mobile": ["32px", { lineHeight: "40px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "headline-md": ["24px", { lineHeight: "32px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "headline-sm": ["20px", { lineHeight: "28px", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "label-md": ["14px", { lineHeight: "20px", letterSpacing: "0.01em", fontWeight: "500" }],
        "label-sm": ["12px", { lineHeight: "16px", fontWeight: "600" }],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.25rem",
        full: "9999px",
      },
      spacing: {
        "gutter": "24px",
        "md": "16px",
        "container-max": "1280px",
        "2xl": "48px",
        "xs": "4px",
        "lg": "24px",
        "sm": "8px",
        "margin-mobile": "16px",
        "3xl": "64px",
        "xl": "32px",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        premium: "0px 4px 20px rgba(55, 48, 163, 0.04)",
        card: "0px 4px 20px rgba(55, 48, 163, 0.06)",
        "card-hover": "0px 8px 30px rgba(55, 48, 163, 0.10)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "pulse-ring": {
          "0%": { boxShadow: "0 0 0 0 rgba(31, 16, 142, 0.4)" },
          "70%": { boxShadow: "0 0 0 10px rgba(31, 16, 142, 0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(31, 16, 142, 0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "pulse-ring": "pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite",
        shimmer: "shimmer 2s linear infinite",
        float: "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
