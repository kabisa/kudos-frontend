import Heading, { HeadingProps } from "./";
import type { Meta } from "@storybook/react";

export const Primary = ({ tag, theme, children }: HeadingProps) => (
  <Heading tag={tag} theme={theme} size="primary">
    {children}
  </Heading>
);

export const Secondary = ({ tag, theme, children }: HeadingProps) => (
  <Heading tag={tag} theme={theme} size="secondary">
    {children}
  </Heading>
);

const meta: Meta<typeof Heading> = {
  component: Heading,
  argTypes: {
    tag: {
      control: {
        type: "inline-radio",
      },
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
    },
    theme: {
      control: {
        type: "inline-radio",
      },
      options: ["black", "white"],
    },
    size: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    tag: "h1",
    theme: "black",
    children: "Heading",
  },
};

export default meta;
