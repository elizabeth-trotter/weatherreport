import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily:
      {
        montserrat: ['Montserrat'],
        oswald: ['Oswald']
      },
      colors: {
        'navyblue':'#1D2837',
        'peach': '#EDA169',
        'babyblue': '#EDA169'
      },
      gridTemplateColumns:
      {
        '73/27': '73% 27%',
      }
    },
  },
  plugins: [],
};
export default config;
