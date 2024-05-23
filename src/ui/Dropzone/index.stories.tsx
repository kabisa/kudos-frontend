import type { Meta, StoryObj } from "@storybook/react";

import Dropzone from ".";

const meta: Meta<typeof Dropzone> = {
  component: Dropzone,
};

type Story = StoryObj<typeof Dropzone>;

export const Default: Story = {
  args: {
    label: "Drop it!",
  },
  render: (args) => <Dropzone {...args} />,
};

export default meta;
