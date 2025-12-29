import daisyui from "daisyui";
import scrollbarHide from "tailwind-scrollbar-hide";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        noto: ["NotoSansKhmer-Regular", "sans-serif"],
        open: ["OpenSans-Regular", "sans-serif"],
        moul: ["Moul-Regular", "sans-serif"],
      },
    },
  },
  plugins: [
    daisyui,
    scrollbarHide,
  ],
  daisyui: {
    themes: [
      {
        dark: {
          primary: "#1A5861",
          secondary: "#174951",
          "base-100": "#418994",
          "base-300": "#12363B",
          accent: "#FFFFFF",
          neutral: "#3DBDCF",
        },
        light: {
          primary: "#EAEAEA",
          secondary: "#FFFFFF",
          "base-100": "#EBEBEB",
          "base-300": "#EBEBEB",
          accent: "#12363C",
          neutral: "#418994",
        },
      },
    ],
  },
};
