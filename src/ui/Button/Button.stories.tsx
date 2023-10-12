import React from "react";
import Button, { ButtonProps } from "./";
import type { Meta } from "@storybook/react";

export const ButtonStory = ({ variant, state, text }: ButtonProps) => (
  <Button variant={variant} state={state} text={text} />
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
    state: {
      control: {
        type: "inline-radio",
      },
      options: ["default", "disabled"],
    },
  },
  args: {
    variant: "primary",
    text: "Hello Button",
    state: "default",
  },
};

export default meta;
