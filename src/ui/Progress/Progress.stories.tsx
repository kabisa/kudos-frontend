import type { Meta, StoryObj } from "@storybook/react";
import KudosProgress from ".";

const meta: Meta<typeof KudosProgress> = {
  component: KudosProgress,
};

export default meta;
type Story = StoryObj<typeof KudosProgress>;

export const ErrorKudo: Story = {
  args: {
    data: {
      state: "error",
      error: "Unexpected errors always occur unexpectedly.",
    },
  },
  render: (args) => <KudosProgress {...args} />,
};

export const LoadingKudo: Story = {
  args: {
    data: {
      state: "loading",
    },
  },
  render: (args) => <KudosProgress {...args} />,
};

export const FilledKudo: Story = {
  args: {
    data: {
      state: "success",
      currentKudos: 25,
      neededKudos: 50,
      goal: "Enchanted Dreams",
    },
  },
  render: (args) => <KudosProgress {...args} />,
};

export const FullKudo: Story = {
  args: {
    data: {
      state: "success",
      currentKudos: 100,
      neededKudos: 100,
      goal: "Bear and bird stole my dreams",
    },
  },
  render: (args) => <KudosProgress {...args} />,
};
