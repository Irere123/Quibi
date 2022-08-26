import "!style-loader!css-loader!postcss-loader!tailwindcss/tailwind.css";
import "../src/styles/globals.css";
import * as NextImage from "next/image";

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

export const parameters = {
  backgrounds: {
    default: "bg-on-figma",
    values: [
      {
        name: "bg-on-figma",
        value: "#0b0e11",
      },
      {
        name: "black",
        value: "#000",
      },
    ],
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
