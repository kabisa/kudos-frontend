import { GET_TEAMS } from "./TeamList";
import { TeamList } from "./index";
import { screen } from "@testing-library/react";
import { setComponent } from "../../../support/testing/testComponent";
import { applicationContext } from "../../../support/testing/testContexts";

const mocksWithInvite = [
  {
    request: {
      query: GET_TEAMS,
    },
    result: {
      data: {
        viewer: {
          memberships: [
            {
              id: "1",
              role: "admin",
              team: {
                id: "2",
                name: "Team 1",
              },
            },
            {
              id: "2",
              role: "admin",
              team: {
                id: "2",
                name: "Team 2",
              },
            },
          ],
        },
      },
    },
  },
];

const mocksWithoutInvite = [
  {
    request: {
      query: GET_TEAMS,
    },
    result: {
      data: {
        viewer: {
          memberships: [],
        },
      },
    },
  },
];

const mocksWithError = [
  {
    request: {
      query: GET_TEAMS,
    },
    error: new Error("It broke"),
  },
];

describe("<TeamList />", () => {
  const { setProps, renderComponent, updateDecorator } = setComponent(
    TeamList,
    applicationContext(mocksWithInvite),
  );
  setProps({});

  it("renders the loading text", async () => {
    renderComponent();

    const loadingElement = screen.getByText("Loading...");
    expect(loadingElement).toBeInTheDocument();
    // Wait till fetch completes
    await screen.findByText("Team 1");
  });

  it("renders the team list", async () => {
    renderComponent();

    const invite = await screen.findByTestId("kudo-team-invites");
    expect(invite).toBeInTheDocument();
  });

  it("shows a message when there are no teams", async () => {
    updateDecorator("application", { mocks: mocksWithoutInvite });
    renderComponent();

    const noTeamsMessage = await screen.findByText("No teams.");
    expect(noTeamsMessage).toBeInTheDocument();
  });

  it("shows a message when there is an error", async () => {
    updateDecorator("application", { mocks: mocksWithError });
    renderComponent();

    const errorMessage = await screen.findByText("It broke");
    expect(errorMessage).toBeInTheDocument();
  });
});
