import { render } from "@testing-library/react";
import GoalProgressIndicator from "./GoalProgressIndicator";

const createGoal = (
  name: string,
  amount: number,
  achievedOn: string | null,
) => ({
  id: Math.floor(Math.random() * 100).toString(),
  name,
  amount,
  achievedOn,
});

test("renders the goal progress indicator", () => {
  const goals = {
    activeGoals: [
      createGoal("First goal", 500, null),
      createGoal("Second goal", 1000, null),
      createGoal("Third goal", 1500, null),
    ],
  };
  const { getAllByRole } = render(
    <GoalProgressIndicator
      activeKudosMeter={{ amount: 200 }}
      goals={goals.activeGoals}
    />,
  );

  const progressBars = getAllByRole("progressbar");
  expect(progressBars).toHaveLength(3);
});

test("renders the goal progress indicator with no goals achieved, but with progress", () => {
  const goals = {
    activeGoals: [
      createGoal("First goal", 500, null),
      createGoal("Second goal", 1000, null),
      createGoal("Third goal", 1500, null),
    ],
  };

  const { getAllByRole } = render(
    <GoalProgressIndicator
      activeKudosMeter={{ amount: 200 }}
      goals={goals.activeGoals}
    />,
  );

  const progressBars = getAllByRole("progressbar");
  expect(progressBars).toHaveLength(3);
  expect(progressBars[progressBars.length - 1]).toHaveAttribute("value", "40");
});

test("renders the goal progress indicator with the first goal achieved", () => {
  const goals = {
    activeGoals: [
      createGoal("First goal", 500, "2023-05-13"),
      createGoal("Second goal", 1000, null),
      createGoal("Third goal", 1500, null),
    ],
  };
  const { getAllByRole } = render(
    <GoalProgressIndicator
      activeKudosMeter={{ amount: 600 }}
      goals={goals.activeGoals}
    />,
  );

  const progressBars = getAllByRole("progressbar");
  expect(progressBars).toHaveLength(3);
  expect(progressBars[progressBars.length - 1]).toHaveAttribute("value", "100");
  expect(progressBars[1]).toHaveAttribute("value", "10");
});
