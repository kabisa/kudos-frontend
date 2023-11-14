import type { Preview } from "@storybook/react";
import "react-toastify/dist/ReactToastify.css";
import "../src/ui/global.css";
import "../src/styles/shell.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
