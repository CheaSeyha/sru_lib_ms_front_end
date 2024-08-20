import { root } from "postcss";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
    "./index.html", "./src/**/*.{js,ts,jsx,tsx}"
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
  plugins: [require("daisyui"), require("tailwind-scrollbar-hide")],
  daisyui: {
    themes: [
      {
        dark: {
          // bg
          primary: "#1A5861",
          secondary: "#174951",
          "base-100": "#418994",
          //for bg defualt
          "base-300": "#12363B",
          // for text color
          // primary
          accent: "#FFFFFF",
          // sec
          neutral: "#3DBDCF",
        },
        light: {
          primary: "#EAEAEA",
          secondary: "#FFFFFF",
          "base-100": "#EBEBEB",
          //for bg defualt
          "base-300": "#EBEBEB",
          // Primary text
          accent: "#12363C",
          // Sec Text
          neutral: "#418994",
        },
      },
    ],
  },
};
