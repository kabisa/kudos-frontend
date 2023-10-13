import React from "react";
import Button, { ButtonProps } from "./";
import type { Meta } from "@storybook/react";

export const ButtonStory = (props: ButtonProps) => <Button {...props} />;

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
    text: "Drop your kudo's!",
    state: "default",
  },
};

export default meta;
