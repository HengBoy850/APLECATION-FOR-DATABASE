// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {
//       colors: {
//         brand: {
//           DEFAULT: "#FF5A3C",
//           light:   "#FFF0ED",
//           dark:    "#E03E22",
//         },
//         accent: {
//           DEFAULT: "#00C48C",
//           light:   "#E6FAF5",
//         },
//         yellow: {
//           DEFAULT: "#FFB800",
//           light:   "#FFF8E6",
//         },
//         ink: {
//           DEFAULT: "#1A1A2E",
//           muted:   "#6B6B80",
//         },
//         surface: "#F7F8FA",
//         card:    "#FFFFFF",
//         line:    "rgba(0,0,0,0.08)",
//       },
//       fontFamily: {
//         sans:    ["Inter", "system-ui", "sans-serif"],
//         display: ["Inter", "system-ui", "sans-serif"],
//       },
//       borderRadius: {
//         xl2: "20px",
//         "2xl": "16px",
//       },
//       boxShadow: {
//         card:   "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
//         sticky: "0 -4px 16px rgba(0,0,0,0.08)",
//         brand:  "0 0 0 3px rgba(255,90,60,0.2)",
//       },
//     },
//   },
//   plugins: [],
// };


// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

//   theme: {
//     extend: {
//       colors: {
//         brand: {
//           DEFAULT: "#FF5A3C",
//           dark: "#E03E22",
//           light: "#FFF0ED",
//         },

//         accent: {
//           DEFAULT: "#00C48C",
//           light: "#E6FAF5",
//         },

//         yellow: {
//           DEFAULT: "#FFB800",
//           light: "#FFF8E6",
//         },

//         ink: {
//           DEFAULT: "#1A1A2E",
//           muted: "#6B6B80",
//         },

//         surface: "#F7F8FA",
//         card: "#FFFFFF",
//         line: "rgba(0,0,0,0.08)",
//       },

//       borderRadius: {
//         xl2: "20px",
//       },

//       boxShadow: {
//         card:
//           "0 1px 3px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.04)",

//         sticky:
//           "0 -4px 16px rgba(0,0,0,.08)",

//         brand:
//           "0 0 0 3px rgba(255,90,60,.2)",
//       },

//       backgroundImage: {
//         hero:
//           "linear-gradient(135deg,#FF5A3C 0%,#FF8C42 100%)",
//       },
//     },
//   },

//   plugins: [],
// };

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // ── Core Brand ──────────────────────────────────────────
        brand: {
          DEFAULT: "#1A7A4A",   // Deep emerald green
          dark:    "#0F5C35",   // Pressed state
          light:   "#E8F5EE",   // Tinted backgrounds
          muted:   "#5FAF82",   // Subdued green
        },

        // ── Accent (coral/orange for CTAs & highlights) ─────────
        accent: {
          DEFAULT: "#FF6B4A",   // Warm coral
          dark:    "#E8502F",
          light:   "#FFF0EC",
        },

        // ── Yellow / Deals ──────────────────────────────────────
        yellow: {
          DEFAULT: "#F5A623",
          light:   "#FFF8E8",
        },

        // ── Ink (text) ──────────────────────────────────────────
        ink: {
          DEFAULT: "#1C2B20",   // Near-black with green tint
          muted:   "#6B7E71",   // Muted body text
          faint:   "#A8B8AD",   // Placeholders
        },

        // ── Surfaces ────────────────────────────────────────────
        canvas:  "#F4FAF6",   // Page background — sage-tinted cream
        card:    "#FFFFFF",
        line:    "#DDE8E1",   // Borders — green-tinted gray

        // ── Status ──────────────────────────────────────────────
        success: "#1A7A4A",
        warning: "#F5A623",
        danger:  "#E8502F",
      },

      fontFamily: {
        display: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
        body:    ["'DM Sans'", "system-ui", "sans-serif"],
        mono:    ["'DM Mono'", "monospace"],
      },

      boxShadow: {
        // Green-tinted shadows — signature FreshGo depth
        card:   "0 2px 8px -1px rgba(26,122,74,0.10), 0 1px 3px rgba(26,122,74,0.06)",
        lifted: "0 8px 24px -4px rgba(26,122,74,0.14), 0 2px 8px rgba(26,122,74,0.08)",
        sticky: "0 -2px 16px rgba(26,122,74,0.10)",
        btn:    "0 4px 14px rgba(26,122,74,0.30)",
        "btn-coral": "0 4px 14px rgba(255,107,74,0.35)",
        glow:   "0 0 0 3px rgba(26,122,74,0.18)",
        badge:  "0 2px 6px rgba(26,122,74,0.25)",
      },

      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },

      backgroundImage: {
        "hero-gradient":    "linear-gradient(135deg, #0F5C35 0%, #1A7A4A 50%, #22A060 100%)",
        "card-shimmer":     "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)",
        "deal-gradient":    "linear-gradient(135deg, #FF6B4A 0%, #F5A623 100%)",
        "brand-radial":     "radial-gradient(circle at 70% 50%, #22A060, #0F5C35)",
      },

      animation: {
        "slide-up":    "slideUp 0.3s ease-out",
        "fade-in":     "fadeIn 0.2s ease-out",
        "pop":         "pop 0.2s cubic-bezier(0.34,1.56,0.64,1)",
        "shimmer":     "shimmer 1.6s infinite linear",
        "pulse-brand": "pulseBrand 2s ease-in-out infinite",
      },

      keyframes: {
        slideUp: {
          from: { opacity: 0, transform: "translateY(12px)" },
          to:   { opacity: 1, transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: 0 },
          to:   { opacity: 1 },
        },
        pop: {
          "0%":   { transform: "scale(0.85)", opacity: 0 },
          "100%": { transform: "scale(1)",    opacity: 1 },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
        pulseBrand: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(26,122,74,0.3)" },
          "50%":      { boxShadow: "0 0 0 8px rgba(26,122,74,0)" },
        },
      },

      maxWidth: {
        "45": "11.25rem",
      },
    },
  },
  plugins: [],
};