import type { Meta, StoryObj } from "@storybook/react";
import { EmptyProgress, KudosProgress } from ".";

const meta: Meta<typeof KudosProgress> = {
  component: KudosProgress,
};

export default meta;
type Story = StoryObj<typeof KudosProgress>;

export const WithKudos: Story = {
  args: {
    percent: 50,
    currentKudos: 500,
    neededKudos: 1000,
    goal: "Enchanted Dreams",
  },
  render: (args) => <KudosProgress {...args} />,
};

export const WithoutKudos: Story = {
  render: () => <EmptyProgress />,
};

export const Completed: Story = {
  args: {
    percent: 100,
    currentKudos: 1000,
    neededKudos: 1000,
    goal: "Enchanted Dreams",
  },
  render: (args) => <KudosProgress {...args} />,
};
