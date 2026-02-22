import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "Segoe UI", "Roboto", "Helvetica", "Arial", "Apple Color Emoji", "Segoe UI Emoji"],
      },
      colors: {
        sand: {
          50: "#faf7f3",
          100: "#f4eee7",
          200: "#e9ddd0",
          300: "#dcc6b3",
          400: "#cfae95",
          500: "#c09578",
          600: "#a8785d",
          700: "#875f4a",
          800: "#6f4f3e",
          900: "#5b4135"
        }
      },
      boxShadow: {
        soft: "0 12px 40px rgba(0,0,0,0.08)"
      }
    },
  },
  plugins: [],
} satisfies Config;
