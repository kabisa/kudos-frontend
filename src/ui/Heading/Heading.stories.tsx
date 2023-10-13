import Heading, { HeadingProps } from "./";
import type { Meta } from "@storybook/react";

export const HeadingStory = ({
  tag,
  size,
  fontWeight,
  children,
}: HeadingProps) => (
  <Heading tag={tag} size={size} fontWeight={fontWeight}>
    {children}
  </Heading>
);

const meta: Meta<typeof Heading> = {
  component: Heading,
  argTypes: {
    size: {
      control: {
        type: "inline-radio",
      },
      options: ["primary", "secondary"],
    },
    tag: {
      control: {
        type: "inline-radio",
      },
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
    },
    fontWeight: {
      control: {
        type: "inline-radio",
      },
      options: ["thin", "light", "regular", "medium", "bold"],
    },
  },
  args: {
    size: "primary",
    tag: "h1",
    children: "Heading",
  },
};

export default meta;
