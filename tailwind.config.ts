import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Design system: use as bg-brand-primary, text-success, etc.
        brand: {
          primary: "hsl(var(--color-brand-primary) / <alpha-value>)",
          secondary: "hsl(var(--color-brand-secondary) / <alpha-value>)",
          accent: "hsl(var(--color-brand-accent) / <alpha-value>)",
        },
        surface: {
          base: "hsl(var(--color-surface-base) / <alpha-value>)",
          raised: "hsl(var(--color-surface-raised) / <alpha-value>)",
          overlay: "hsl(var(--color-surface-overlay) / <alpha-value>)",
        },
        text: {
          primary: "hsl(var(--color-text-primary) / <alpha-value>)",
          secondary: "hsl(var(--color-text-secondary) / <alpha-value>)",
          inverse: "hsl(var(--color-text-inverse) / <alpha-value>)",
        },
        success: "hsl(var(--color-success) / <alpha-value>)",
        warning: "hsl(var(--color-warning) / <alpha-value>)",
        error: "hsl(var(--color-error) / <alpha-value>)",
        // shadcn/Origin UI
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        primary: "hsl(var(--primary) / <alpha-value>)",
        "primary-foreground": "hsl(var(--primary-foreground) / <alpha-value>)",
        "muted-foreground": "hsl(var(--muted-foreground) / <alpha-value>)",
        accent: "hsl(var(--accent) / <alpha-value>)",
        "accent-foreground": "hsl(var(--accent-foreground) / <alpha-value>)",
        destructive: "hsl(var(--destructive) / <alpha-value>)",
        "destructive-foreground": "hsl(var(--destructive-foreground) / <alpha-value>)",
        secondary: "hsl(var(--secondary) / <alpha-value>)",
        "secondary-foreground": "hsl(var(--secondary-foreground) / <alpha-value>)",
        card: "hsl(var(--card) / <alpha-value>)",
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        /* Practice page only — use inside .practice-tower */
        practice: {
          "node-bg": "hsl(var(--practice-node-bg) / <alpha-value>)",
          "node-border": "hsl(var(--practice-node-border) / <alpha-value>)",
          "glow-active": "hsl(var(--practice-glow-active) / <alpha-value>)",
          "glow-completed": "hsl(var(--practice-glow-completed) / <alpha-value>)",
          "stair-locked": "hsl(var(--practice-stair-locked) / <alpha-value>)",
          "stair-active": "hsl(var(--practice-stair-active) / <alpha-value>)",
          "stair-completed": "hsl(var(--practice-stair-completed) / <alpha-value>)",
          "landing-bg": "hsl(var(--practice-landing-bg) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-geist-display)", "var(--font-geist-sans)", "sans-serif"],
      },
      scale: {
        "practice-hover": "var(--practice-motion-hover-scale)",
      },
      borderRadius: {
        "2xl": "var(--radius-2xl)",
        xl: "var(--radius-xl)",
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        elevated: "var(--shadow-elevated)",
        glow: "var(--shadow-glow)",
        "practice-node-rest": "var(--practice-node-shadow-rest)",
        "practice-node-depth": "var(--practice-node-shadow-depth)",
        "practice-node-depth-glow": "var(--practice-node-shadow-depth-glow)",
        "practice-node-hover": "var(--practice-node-shadow-hover)",
        "practice-node-active": "var(--practice-node-shadow-active)",
      },
      transitionDuration: {
        "practice-hover": "var(--practice-motion-hover-duration)",
        "practice-completion": "var(--practice-motion-completion-pop-duration)",
        "practice-reward": "var(--practice-motion-reward-float-duration)",
        "practice-scroll": "var(--practice-motion-auto-scroll-duration)",
      },
      transitionTimingFunction: {
        "practice": "var(--practice-motion-hover-ease)",
        "practice-completion": "var(--practice-motion-completion-pop-ease)",
        "practice-reward": "var(--practice-motion-reward-float-ease)",
        "practice-scroll": "var(--practice-motion-auto-scroll-ease)",
      },
      animation: {
        "bounce-soft": "bounce-soft 0.5s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-up": "slide-up 0.4s ease-out",
        "scale-pop": "scale-pop 0.5s ease-out",
        "pop-in": "pop-in 0.3s ease-out forwards",
        "scale-pulse": "scale-pulse 0.15s ease-out forwards",
        "level-glow": "level-glow 1s ease-out forwards",
        float: "float 3s ease-in-out infinite",
        shake: "shake 0.4s ease-in-out",
        "practice-idle-pulse": "practice-idle-pulse var(--practice-motion-idle-pulse-duration) var(--practice-motion-idle-pulse-ease) infinite",
        "practice-completion-pop": "practice-completion-pop var(--practice-motion-completion-pop-duration) var(--practice-motion-completion-pop-ease) forwards",
        "practice-reward-float": "practice-reward-float var(--practice-motion-reward-float-duration) var(--practice-motion-reward-float-ease) forwards",
        "blob-drift": "blob-drift 18s ease-in-out infinite",
      },
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(-4px)" },
          "40%": { transform: "translateX(4px)" },
          "60%": { transform: "translateX(-3px)" },
          "80%": { transform: "translateX(3px)" },
        },
        "bounce-soft": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-pop": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.12)" },
        },
        "pop-in": {
          "0%": { transform: "scale(0.85)" },
          "100%": { transform: "scale(1)" },
        },
        "scale-pulse": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        "level-glow": {
          "0%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(1.15)" },
          "100%": { opacity: "0", transform: "scale(1.3)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        "blob-drift": {
          "0%, 100%": { transform: "translate(-50%, -50%) scale(1)", opacity: "0.08" },
          "50%": { transform: "translate(-48%, -52%) scale(1.05)", opacity: "0.12" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
