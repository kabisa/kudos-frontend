import Button from "./";
import type { Meta, StoryObj } from "@storybook/react";
import { LikeButton as LikeButtonComponent } from "./LikeButton";

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;

export const GenericButton: StoryObj<typeof Button> = {
  args: {
    variant: "primary",
    state: "default",
    text: "Drop your Kudo's",
    icon: "",
  },
  argTypes: {
    icon: {
      name: "Icon",
      control: {
        type: "select",
      },
      options: ["", "flag", "delete"],
      defaultValue: "flag",
    },
  },
  render: (props) => <Button {...props} />,
};

export const LikeButton: StoryObj<typeof LikeButtonComponent> = {
  args: {
    liked: false,
  },
  render: (props) => <LikeButtonComponent {...props} />,
};
