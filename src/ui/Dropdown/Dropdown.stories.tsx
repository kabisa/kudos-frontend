import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown, DropdownMenuItem } from ".";

const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
  argTypes: {
    label: {
      control: {
        type: "text",
      },
    },
  },
  args: {
    label: "Home",
  },
  parameters: {
    backgrounds: {
      default: "green",
      values: [{ name: "green", value: "#18242b" }],
    },
  },
};

type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  render: (args) => (
    <Dropdown {...args}>
      <DropdownMenuItem iconName="flag" label="About" />
      <DropdownMenuItem iconName="man" label="User" />
    </Dropdown>
  ),
};

export default meta;
