import { screen } from "@testing-library/react";
import GoalProgressIndicator from "./GoalProgressIndicator";
import { createGoal } from "./factory";
import { setTestSubject } from "../../support/testing/testSubject";

describe("GoalProgressIndicator", () => {
  const { renderComponent, updateProps } = setTestSubject(
    GoalProgressIndicator,
    {
      props: {
        goals: [
          createGoal("Third goal", 1500, null),
          createGoal("Second goal", 1000, null),
          createGoal("First goal", 500, null),
        ],
        activeKudosMeter: { amount: 200 },
      },
    },
  );

  it("renders the goal progress indicator", () => {
    renderComponent();

    const progressBars = screen.getAllByRole("progressbar");
    expect(progressBars).toHaveLength(3);
  });

  it("renders the goal progress indicator with no goals achieved, but with progress", () => {
    renderComponent();

    const progressBars = screen.getAllByRole("progressbar");
    expect(progressBars).toHaveLength(3);
    expect(progressBars[progressBars.length - 1]).toHaveAttribute(
      "value",
      "40",
    );
  });

  it("renders the goal progress indicator with the first goal achieved", () => {
    updateProps({
      goals: [
        createGoal("Third goal", 1500, null),
        createGoal("Second goal", 1000, null),
        createGoal("First goal", 500, "2023-05-13"),
      ],
      activeKudosMeter: { amount: 600 },
    });
    renderComponent();

    const progressBars = screen.getAllByRole("progressbar");
    expect(progressBars).toHaveLength(3);
    expect(progressBars[progressBars.length - 1]).toHaveAttribute(
      "value",
      "100",
    );
    expect(progressBars[1]).toHaveAttribute("value", "20");
  });
});
