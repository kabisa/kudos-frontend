import React from "react";
import Button, { ButtonProps } from "./";
import type { Meta } from "@storybook/react";

export const ButtonStory = ({ variant, text }: ButtonProps) => (
  <Button variant={variant} text={text} />
);

const meta: Meta<typeof Button> = {
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: "inline-radio",
      },
      options: ["primary", "secondary"],
    },
  },
  args: {
    variant: "primary",
    text: "Hello Button",
  },
};

export default meta;
