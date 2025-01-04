import type { Config } from "tailwindcss";
import { keyframes, animation } from "./src/config/tailwind/animations";
import { colors } from "./src/config/tailwind/colors";
import { container, borderRadius } from "./src/config/tailwind/theme";

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
    container,
    extend: {
      keyframes,
      animation,
      colors,
      borderRadius,
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;