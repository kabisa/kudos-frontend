import { GET_TEAMS } from "./TeamList";
import { withMockedProviders } from "../../../spec_helper";
import { TeamList } from "./index";
import { render, screen } from "@testing-library/react";

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
  beforeEach(() => {
    render(withMockedProviders(<TeamList />, mocksWithInvite));
  });

  it("renders the loading text", async () => {
    const loadingElement = screen.getByText("Loading...");
    expect(loadingElement).toBeInTheDocument();
    // Wait till fetch completes
    await screen.findByText("Team 1");
  });

  it("renders the team list", async () => {
    const invite = await screen.findByTestId("kudo-team-invites");
    expect(invite).toBeInTheDocument();
  });

  it("shows a message when there are no teams", async () => {
    render(withMockedProviders(<TeamList />, mocksWithoutInvite));

    const noTeamsMessage = await screen.findByText("No teams.");
    expect(noTeamsMessage).toBeInTheDocument();
  });

  it("shows a message when there is an error", async () => {
    render(withMockedProviders(<TeamList />, mocksWithError));

    const errorMessage = await screen.findByText("It broke");
    expect(errorMessage).toBeInTheDocument();
  });
});
