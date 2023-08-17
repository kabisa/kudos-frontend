import React from "react";
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
          teamInvites: [
            {
              id: '1',
              team: {
                id: '1',
                name: 'Kabisa',
              },
            },
            {
              id: '2',
              team: {
                id: '2',
                name: 'Dovetail',
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
          memberships: [
            {
              id: '1',
              role: 'admin',
              team: {
                id: '2',
                name: 'Team 1',
              },
            },
            {
              id: '2',
              role: 'admin',
              team: {
                id: '2',
                name: 'Team 2',
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

    const inviteList = screen.getByTestId("invite-list");

    expect(inviteList).toBeInTheDocument();
  });

  it("renders the team list", async () => {
    render(withMockedProviders(<Content />, mockWithInvites));

    const teamList = screen.getByTestId("personal-team-list");

    expect(teamList).toBeInTheDocument();
  });

  it("renders the create team button", () => {
    render(withMockedProviders(<Content />, mockWithInvites));

    const createTeamButton = screen.getByRole("button", {
      name: "Create team",
    });
    expect(createTeamButton).toBeInTheDocument();
  });

  it("navigates to the create team page", async () => {
    render(withMockedProviders(<Content />, mockWithInvites));

    const createTeamButton = screen.getByRole("button", {
      name: "Create team",
    });
    fireEvent.click(createTeamButton);

    expect(mockHistoryPush).toHaveBeenCalledWith("/create-team");
  });
});
