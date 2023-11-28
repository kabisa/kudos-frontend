import type { Meta, StoryObj } from "@storybook/react";
import KudosProgress from ".";
import GoalProgressIndicator from "./GoalProgressIndicator";
import { createGoal } from "./factory";

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
    createGoal("Fifth goal", 2500, null),
    createGoal("Fourth goal", 2000, null),
    createGoal("Third goal", 1500, null),
    createGoal("Second goal", 1000, "2023-05-20"),
    createGoal("First goal", 500, "2023-05-13"),
  ],
  activeKudosMeter: {
    amount: 1250,
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
