/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#660505",
      },
      screens: {
        smm: { min: "100px", max: "1024px" },
        smml: { min: "100px", max: "580px" },
      },
    },
  },
  plugins: [],
};
