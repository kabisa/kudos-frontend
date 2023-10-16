import React from "react";
import Button, { ButtonProps } from "./";
import type { Meta } from "@storybook/react";

export const ButtonStory = (props: ButtonProps) => (
  <Button {...props}>{props.children}</Button>
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
    children: {
      control: {
        type: "text",
      },
    },
  },
  args: {
    variant: "primary",
    children: <span>Drop your kudo's!</span>,
    state: "default",
  },
};

export default meta;
