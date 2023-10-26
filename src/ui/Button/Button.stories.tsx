import React from "react";
import Button, { ButtonProps } from "./";
import type { Meta } from "@storybook/react";
import { Icon } from "@sandercamp/ui-components";

export const ButtonStory = (props: ButtonProps) => <Button {...props} />;

const meta: Meta<typeof Button> = {
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: "inline-radio",
      },
      options: ["primary", "secondary", "tertiary"],
    },
    state: {
      control: {
        type: "inline-radio",
      },
      options: ["default", "disabled"],
    },
    text: {
      control: {
        type: "text",
      },
    },
    icon: {
      name: "Icon",
      control: {
        type: "select",
      },
      options: [null, "flag", "delete"],
      defaultValue: "flag",
    },
  },
  args: {
    variant: "primary",
    text: "Drop your Kudo's",
    icon: "flag",
    state: "default",
  },
};

export default meta;
