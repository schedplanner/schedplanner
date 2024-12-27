/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        custom: {
          holiday: 'theme("colors.green.500")',
        },
      },
      borderWidth: {
        1: "1px",
      },
    },
  },
  plugins: [],
};
