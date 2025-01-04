import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        marquee: {
          '0%': { 
            transform: 'translateX(0%)',
            opacity: '0'
          },
          '10%': {
            opacity: '1'
          },
          '90%': {
            opacity: '1'
          },
          '100%': { 
            transform: 'translateX(-50%)',
            opacity: '0'
          },
        },
        marqueeReverse: {
          '0%': { 
            transform: 'translateX(-50%)',
            opacity: '0'
          },
          '10%': {
            opacity: '1'
          },
          '90%': {
            opacity: '1'
          },
          '100%': { 
            transform: 'translateX(0%)',
            opacity: '0'
          },
        },
        sidebarSlideIn: {
          '0%': { 
            opacity: '0'
          },
          '100%': { 
            opacity: '1'
          },
        },
        sidebarSlideOut: {
          '0%': { 
            opacity: '1'
          },
          '100%': { 
            opacity: '0'
          }
        },
        gradientFlow: {
          '0%': { 
            backgroundPosition: '0% 50%'
          },
          '50%': {
            backgroundPosition: '100% 50%'
          },
          '100%': {
            backgroundPosition: '0% 50%'
          }
        }
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        marqueeReverse: 'marqueeReverse 40s linear infinite',
        sidebarIn: 'sidebarSlideIn 0.5s ease-in-out',
        sidebarOut: 'sidebarSlideOut 0.5s ease-in-out',
        gradient: 'gradientFlow 15s ease infinite'
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        chatgpt: {
          sidebar: "#202123",
          main: "#343541",
          secondary: "#444654",
          hover: "#2A2B32",
          border: "#4E4F60",
          input: "#40414F"
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;