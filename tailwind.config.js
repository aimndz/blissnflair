/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        primary: {
          100: "#03F484",
        },
        secondary: {
          900: "#2B2B2B", // main text color
          800: "#6A6A6A", // secondary text color
          700: "#A9A9A9", // placeholder color
          600: "#C7C7C7", // border color
          300: "#E1E1E1", // secondary background color
          200: "#EBEBEB", // primary background color
          100: "#FCFCFC",
        },
        accent: {
          500: "#FF6C6C",
        },

        // Event status colors
        status: {
          approved: {
            bg: "#DFF659",
            border: "#A2DB05",
          },
          pending: {
            bg: "#B0F3FF",
            border: "#00D9FF",
          },
          rejected: {
            bg: "#FF8181",
            border: "#DF5555",
          },
          completed: {
            bg: "#7DFFA4",
            border: "#02DB43",
          },
          canceled: {
            bg: "#FDC8D5",
            border: "#B5B5B5",
          },
        },
      },
    },
  },
  plugins: [],
};
