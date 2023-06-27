/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1280px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
      xs: { max: "450px" },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-ltr":
          "linear-gradient(to right, #e6e6e6 5%, #cccccc 25%, #e6e6e6 35%)",
      },

      backgroundSize: {
        "x-y": "1000px 100%",
      },
      boxShadow: {
        custom: "1px 2px 4px 1px rgba(0, 0, 0, 0.08)",
        header: " -1px 4px 20px 14px rgba(0, 0, 0, 0.2)",
        button: "-1px 4px 2px 1px rgba(13,122,205,1)",
      },
      animation: {
        "animate-ltr": "animate 3s ease-out infinite ",
      },
      keyframes: {
        animate: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
    },
  },
  plugins: [],
};
