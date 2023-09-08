/* eslint-disable no-proto */
import React from "react";
import { gql } from "@apollo/client";
import ChoiceButton from "./ChoiceButton";
import { withMockedProviders } from "../../../spec_helper";
import { Storage } from "../../../support/storage";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const fakeMutation = gql`
  mutation fakeMutation($team_invite_id: ID!) {
    fakeMutation(teamInviteId: $team_invite_id) {
      teamInvite {
        id
      }
    }
  }
`;
let mutationCalled = false;
const mocks = [
  {
    request: {
      query: fakeMutation,
      variables: { team_invite_id: "1" },
    },
    result: () => {
      mutationCalled = true;
      return { data: { fakeMutation: { teamInvite: { id: "1" } } } };
    },
  },
];

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe("<ChoiceButton />", () => {
  beforeEach(async () => {
    mutationCalled = false;
    Storage.setItem = jest.fn();
  });

  it("renders the provided text", () => {
    render(
      withMockedProviders(
        <ChoiceButton
          inviteId="1"
          variant="primary"
          mutation={fakeMutation}
          accept
          teamId="1"
          text="button text"
        />,
        mocks,
      ),
    );

    expect(screen.getByText("button text")).toBeInTheDocument();
  });

  it("sets the loading state", async () => {
    render(
      withMockedProviders(
        <ChoiceButton
          inviteId="1"
          variant="primary"
          mutation={fakeMutation}
          accept
          teamId="1"
          text="button text"
        />,
        mocks,
      ),
    );

    const button = screen.getByRole("button", { name: "button text" });
    userEvent.click(button);

    await waitFor(() => {
      expect(button).toHaveClass("loading");
    });
  });

  it("calls the mutation on button click", async () => {
    render(
      withMockedProviders(
        <ChoiceButton
          inviteId="1"
          variant="primary"
          mutation={fakeMutation}
          accept
          teamId="1"
          text="button text"
        />,
        mocks,
      ),
    );

    userEvent.click(screen.getByRole("button", { name: "button text" }));

    await waitFor(() => {
      expect(mutationCalled).toBe(true);
    });
  });

  it("sets the team id if the accept property is true", async () => {
    render(
      withMockedProviders(
        <ChoiceButton
          inviteId="1"
          variant="primary"
          mutation={fakeMutation}
          accept
          teamId="1"
          text="button text"
        />,
        mocks,
      ),
    );

    userEvent.click(screen.getByRole("button", { name: "button text" }));

    await waitFor(() => {
      expect(Storage.setItem).toBeCalledWith("team_id", "1");
    });
  });

  it("navigates to the next page if the accept property is true", async () => {
    render(
      withMockedProviders(
        <ChoiceButton
          inviteId="1"
          variant="primary"
          mutation={fakeMutation}
          accept
          teamId="1"
          text="button text"
        />,
        mocks,
      ),
    );

    userEvent.click(screen.getByRole("button", { name: "button text" }));

    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledWith("/");
    });
  });

  it("doesnt set the team id the accept property is false", async () => {
    render(
      withMockedProviders(
        <ChoiceButton
          inviteId="1"
          variant="primary"
          mutation={fakeMutation}
          accept={false}
          teamId="1"
          text="button text"
        />,
        mocks,
      ),
    );

    userEvent.click(screen.getByRole("button", { name: "button text" }));

    await waitFor(() => {
      expect(Storage.setItem).toBeCalledTimes(0);
    });
  });
});
