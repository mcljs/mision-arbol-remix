module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#E3FCF5",
          100: "#BAF8E6",
          200: "#8CF4D5",
          300: "#5DEFC4",
          400: "#3BEBB7",
          500: "#18E8AA",
          600: "#1BD19B",
          700: "#10BE81",
          800: "#16AB73",
          900: "#8bbd52",
          1000: "#8bbd52",
        },
        secondary: {
          50: "#EBEFF1",
          100: "#D3D8DC",
          200: "#B2BAC1",
          300: "#8D98A2",
          400: "#647582",
          500: "#4D6274",
          600: "#324757",
          700: "#223748",
          800: "#132330",
          900: "#091824",
        },
      },

      variants: {
        opacity: ["responsive", "hover", "focus", "dark", "group-hover"],
        boxShadow: ["responsive", "hover", "focus", "dark"],
        animation: ["responsive", "motion-safe", "motion-reduce"],
        transitionProperty: ["responsive", "motion-safe", "motion-reduce"],
      },
      maxWidth: {
        "8xl": "96rem",
      },
      maxHeight: {
        "50vh": "50vh", // max height for medium size hero images
        "75vh": "75vh", // max height for giant size hero images
      },
      spacing: {
        "5vw": "5vw", // pull featured sections and navbar in the margin
        "8vw": "8vw", // positions hero img inside the margin
        "10vw": "10vw", // page margin
      },
      animation: {
        "fade-in": "fade-in 0.5s linear forwards",
        marquee: "marquee var(--marquee-duration) linear infinite",
        "spin-slow": "spin 4s linear infinite",
        "spin-slower": "spin 6s linear infinite",
        "spin-reverse": "spin-reverse 1s linear infinite",
        "spin-reverse-slow": "spin-reverse 4s linear infinite",
        "spin-reverse-slower": "spin-reverse 6s linear infinite",
      },
      keyframes: {
        "fade-in": {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        },
        marquee: {
          "100%": {
            transform: "translateY(-50%)",
          },
        },
        "spin-reverse": {
          to: {
            transform: "rotate(-360deg)",
          },
        },
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant(
        "supports-backdrop-blur",
        "@supports (backdrop-filter: blur(0)) or (-webkit-backdrop-filter: blur(0))"
      );
      addVariant(
        "supports-scrollbars",
        "@supports selector(::-webkit-scrollbar)"
      );
      addVariant("children", "& > *");
      addVariant("scrollbar", "&::-webkit-scrollbar");
      addVariant("scrollbar-track", "&::-webkit-scrollbar-track");
      addVariant("scrollbar-thumb", "&::-webkit-scrollbar-thumb");
      addVariant("demo-dark", ".demo-dark &");
    },
    require("@tailwindcss/typography"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
  ],
};
