module.exports = {
  darkMode: false, // or 'media' or 'class'
  content: ["./src/**/**.**"],
  theme: {
    fontFamily: {
      sans: [
        "Inter",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica",
        "Arial",
        "sans-serif",
      ],
      mono: ["Menlo", "Monaco", "Courier New", "monospace"],
    },
    fontSize: {
      tiny: "0.625rem",
      xs: ".75rem",
      sm: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
    },
    colors: {
      button: "var(--color-bg-black)",
      transparent: "transparent",
      primary: {
        50: "var(--color-primary-50)",
        100: "var(--color-primary-100)",
        200: "var(--color-primary-200)",
        300: "var(--color-primary-300)",
        400: "var(--color-primary-400)",
        500: "var(--color-primary-500)",
        600: "var(--color-primary-600)",
      },
      accent: {
        DEFAULT: "var(--color-primary-300)",
        hover: "var(--color-primary-200)",
        disabled: "var(--color-primary-200)",
      },
      black: "#000",
    },
    borderWidth: {
      DEFAULT: "1px",
      0: "0px",
      4: "4px",
      2: "2px",
    },
  },

  plugins: [],
};
