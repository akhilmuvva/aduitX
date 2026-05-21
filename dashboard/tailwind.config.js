/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#050508",
          dark: "#0a0b10",
          card: "rgba(16, 18, 27, 0.7)",
          cardHover: "rgba(24, 27, 41, 0.95)",
          border: "rgba(255, 255, 255, 0.08)",
          indigo: "hsl(263, 90%, 55%)",
          pink: "hsl(290, 100%, 60%)",
          cyan: "hsl(185, 100%, 50%)",
          emerald: "hsl(142, 70%, 45%)",
          amber: "hsl(37, 95%, 50%)",
          rose: "hsl(346, 85%, 50%)",
        }
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        fira: ['Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-indigo': '0 0 20px rgba(99, 102, 241, 0.25)',
        'glow-pink': '0 0 20px rgba(236, 72, 153, 0.25)',
        'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.25)',
        'glow-emerald': '0 0 20px rgba(16, 185, 129, 0.25)',
        'glow-amber': '0 0 20px rgba(245, 158, 11, 0.25)',
        'glow-rose': '0 0 20px rgba(244, 63, 94, 0.25)',
      }
    },
  },
  plugins: [],
}
