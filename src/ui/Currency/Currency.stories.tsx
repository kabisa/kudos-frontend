import type { Meta, StoryObj } from "@storybook/react";
import Currency from ".";

const meta: Meta<typeof Currency> = {
  component: Currency,
};

export default meta;
type Story = StoryObj<typeof Currency>;

export const Default: Story = {
  args: {
    amount: 50,
  },
  render: (args) => <Currency {...args} />,
};
