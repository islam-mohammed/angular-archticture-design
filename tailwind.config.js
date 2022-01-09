module.exports = {
  prefix: "",
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      "2xl": "1400px",
    },

    extend: {
      boxShadow: {
        input: "0 0 0 1px #212529",
      },
      colors: {
        primary: "hsla(0,0%,7%,1)",
        secondry: "#585e64",
        success: "#28a745",
        error: "#dc3545",
        warning: "#ffc107",
        info: "#17a2b8",
        light: "#f8f9fa",
        link: "#1A75BB",
      },
      fontFamily: {
        base: ["georgia", "sans-serif"],
        material: ["Material Icons"],
      },
      minWidth: {
        12.5: "3.125rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("tw-elements/dist/plugin")],
};
