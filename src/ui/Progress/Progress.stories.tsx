import type { Meta, StoryObj } from "@storybook/react";
import ProgressCircle, { ProgressProps } from ".";

const meta: Meta<typeof ProgressCircle> = {
  component: ProgressCircle,
};

export default meta;
type Story = StoryObj<typeof ProgressCircle>;

export const WithKudos: Story = {
  args: {
    percent: 50,
    currentKudos: 500,
    neededKudos: 1000,
    goal: "Enchanted Dreams",
  },
  render: (args) => <ProgressCircle {...args} />,
};

export const WithoutKudos: Story = {
  args: {
    percent: 50,
  },
  render: (args) => <ProgressCircle {...args} />,
};

export const Completed: Story = {
  args: {
    percent: 100,
    currentKudos: 1000,
    neededKudos: 1000,
    goal: "Enchanted Dreams",
  },
  render: (args) => <ProgressCircle {...args} />,
};
