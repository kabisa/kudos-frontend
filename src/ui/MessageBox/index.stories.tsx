import type { Meta, StoryObj } from "@storybook/react";

import MessageBox from ".";

const meta: Meta<typeof MessageBox> = {
  component: MessageBox,
};

type Story = StoryObj<typeof MessageBox>;

export const Default: Story = {
  args: {
    variant: "error",
    title: "Title",
    message: "Message",
  },
  render: (args) => <MessageBox {...args} />,
};

export default meta;
