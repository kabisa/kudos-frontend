import { withMockedProviders } from "../../spec_helper";
import { Content } from "./ChooseTeamPage";
import { render, screen, fireEvent } from "@testing-library/react";
import { GET_INVITES } from "./components/InviteList";
import { GET_TEAMS } from "./components/TeamList";

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const mockWithInvites = [
  {
    request: {
      query: GET_INVITES,
    },
    result: {
      data: {
        viewer: {
          __typename: "Viewer",
          id: "1",
          teamInvites: [
            {
              __typename: "TeamInvite",
              id: "1",
              team: {
                __typename: "Team",
                id: "1",
                name: "Kabisa",
              },
            },
            {
              __typename: "TeamInvite",
              id: "2",
              team: {
                __typename: "Team",
                id: "2",
                name: "Dovetail",
              },
            },
          ],
        },
      },
    },
  },
  {
    request: {
      query: GET_TEAMS,
    },
    result: {
      data: {
        viewer: {
          __typename: "Viewer",
          id: "1",
          memberships: [
            {
              __typename: "TeamMembership",
              id: "1",
              role: "admin",
              team: {
                __typename: "Team",
                id: "1",
                name: "Team 1",
              },
            },
            {
              __typename: "TeamMembership",
              id: "2",
              role: "admin",
              team: {
                __typename: "Team",
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

describe("<ChooseTeamPage />", () => {
  it("renders the invite list", async () => {
    render(withMockedProviders(<Content />, mockWithInvites));

    const inviteList = await screen.findByTestId("invite-list");
    expect(inviteList).toBeInTheDocument();
  });

  it("renders the team list", async () => {
    render(withMockedProviders(<Content />, mockWithInvites));

    const teamInvites = await screen.findByTestId("kudo-team-invites");
    expect(teamInvites).toBeInTheDocument();
  });

  it("renders the create team button", () => {
    render(withMockedProviders(<Content />, mockWithInvites));

    const createTeamButton = screen.getByRole("button", {
      name: "Create team",
    });
    expect(createTeamButton).toBeInTheDocument();
  });

  it("navigates to the create team page", () => {
    const { unmount } = render(
      withMockedProviders(<Content />, mockWithInvites),
    );

    const createTeamButton = screen.getByRole("button", {
      name: "Create team",
    });
    fireEvent.click(createTeamButton);

    expect(mockHistoryPush).toHaveBeenCalledWith("/create-team");
    unmount();
  });
});
