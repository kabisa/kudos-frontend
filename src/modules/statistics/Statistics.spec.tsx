import { mockLocalstorage } from "../../spec_helper";
import { setComponent } from "../../support/testing/testComponent";
import { applicationContext } from "../../support/testing/testContexts";
import Statistics, { GET_GOAL_PERCENTAGE } from "./Statistics";
import { screen, waitFor, within } from "@testing-library/react";

export const mocks = (teamId: string) => [
  {
    request: {
      query: GET_GOAL_PERCENTAGE,
      variables: { team_id: teamId },
    },
    result: {
      data: {
        teamById: {
          id: teamId,
          __typename: "Team",
          activeGoals: [
            {
              id: "1",
              name: "Bowlen",
              amount: 200,
              achievedOn: "2020-03-10",
            },
            {
              id: "2",
              name: "Hapje eten",
              amount: 500,
              achievedOn: "",
            },
          ],
          activeKudosMeter: {
            amount: 250,
          },
        },
      },
    },
  },
];

describe("<Statistics />", () => {
  const { setProps, renderComponent } = setComponent(
    Statistics,
    applicationContext(mocks("1")),
  );
  setProps({});

  beforeEach(() => {
    mockLocalstorage("1");

    renderComponent();
  });

  it("shows a loading state", async () => {
    expect(
      screen.getByRole("heading", { level: 3, name: "Loading..." }),
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.queryByRole("heading", { level: 3, name: "Loading..." }),
      ).toBeNull();
    });
  });

  it("shows the progress circle", async () => {
    const element = document.getElementsByClassName("rc-progress-circle")[0];

    expect(element).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.queryByRole("heading", { level: 3, name: "Loading..." }),
      ).toBeNull();
    });
  });

  it("shows a goal section for all goals", async () => {
    const goalSections = await screen.findAllByTestId("goal-section");
    expect(goalSections).toHaveLength(2);
  });

  it("shows the goal amount", async () => {
    const goalSections = await screen.findAllByTestId("goal-section");

    const goalAmount = await within(goalSections[0]).findByRole("heading", {
      level: 3,
      name: "500 ₭",
    });
    expect(goalAmount).toBeInTheDocument();
  });

  it("shows the goal name", async () => {
    const goalSections = await screen.findAllByTestId("goal-section");

    const goalAmount = await within(goalSections[0]).findByText(
      "[Goal 2] Hapje eten",
    );
    expect(goalAmount).toBeInTheDocument();
  });

  it("shows an unlocked symbol if the goal is achieved", async () => {
    const goalSections = await screen.findAllByTestId("goal-section");

    expect(within(goalSections[1]).getByText("lock_open")).toBeInTheDocument();
  });

  it("shows the date if the goal is achieved", async () => {
    const goalSections = await screen.findAllByTestId("goal-section");

    expect(
      within(goalSections[1]).getByText("Achieved on 10 Mar, 2020"),
    ).toBeInTheDocument();
  });

  it("shows the progress if the goal is not achieved", async () => {
    const goalSections = await screen.findAllByTestId("goal-section");

    expect(within(goalSections[0]).getByText("250 / 500₭")).toBeInTheDocument();
  });

  it("shows a locked symbol if the goal is not achieved", async () => {
    const goalSections = await screen.findAllByTestId("goal-section");

    expect(within(goalSections[0]).getByText("lock")).toBeInTheDocument();
  });

  it("fills the orb completely if the goal is achieved", async () => {
    const achievedGoalProgress = (
      await screen.findAllByTestId("progress-bar")
    )[1];
    expect(achievedGoalProgress.style["backgroundColor"]).toEqual(
      "rgb(36, 179, 113)",
    );
  });

  it("fills the orb not if the goal is pending", async () => {
    const achievedGoalProgress = (
      await screen.findAllByTestId("progress-bar")
    )[0];
    expect(achievedGoalProgress.style["backgroundColor"]).toEqual(
      "rgb(191, 219, 207)",
    );
  });

  it("fills the progress bar to the correct percentage if the goal is not achieved", async () => {
    const pendingGoalProgress = await screen.findByTestId("next-progress-bar");
    expect(pendingGoalProgress.style["backgroundColor"]).toEqual(
      "rgb(36, 179, 113)",
    );
    expect(pendingGoalProgress.style["height"]).toEqual("17px");
    expect(pendingGoalProgress.style["marginTop"]).toEqual("88px");
  });
});
