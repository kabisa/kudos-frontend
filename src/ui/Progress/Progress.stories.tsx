import type { Meta, StoryObj } from "@storybook/react";
import KudosProgress from ".";
import GoalProgressIndicator from "./GoalProgressIndicator";

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

const goals = {
  activeGoals: [
    {
      id: "62",
      name: "First goal",
      amount: 500,
      achievedOn: true,
    },
    {
      id: "63",
      name: "Second goal",
      amount: 1000,
      achievedOn: true,
    },
    {
      id: "64",
      name: "Third goal",
      amount: 1500,
      achievedOn: null,
    },
    {
      id: "94",
      name: "Fourth goal",
      amount: 2000,
      achievedOn: null,
    },
    {
      id: "95",
      name: "Fifth goal",
      amount: 2500,
      achievedOn: null,
    },
  ],
  activeKudosMeter: {
    amount: 1400,
  },
};
export const GoalProgressIndicatorStory: Story = {
  render: () => (
    <GoalProgressIndicator
      goals={goals.activeGoals}
      activeKudosMeter={goals.activeKudosMeter}
    />
  ),
};
