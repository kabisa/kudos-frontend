import { gql } from "@apollo/client";
import ChoiceButton from "./ChoiceButton";
import { Storage } from "../../../support/storage";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setComponent } from "../../../support/testing/testComponent";
import { dataDecorator } from "../../../support/testing/testDecorators";

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
  const { renderComponent, updateProps } = setComponent(ChoiceButton, {
    decorators: [dataDecorator(mocks)],
    props: {
      inviteId: "1",
      variant: "primary",
      mutation: fakeMutation,
      accept: true,
      teamId: "1",
      text: "button text",
    },
  });

  beforeEach(() => {
    mutationCalled = false;
    Storage.setItem = jest.fn();
  });

  it("renders the provided text", () => {
    renderComponent();

    expect(screen.getByText("button text")).toBeInTheDocument();
  });

  it("disables while loading", async () => {
    renderComponent();

    const button = screen.getByRole("button", { name: "button text" });
    userEvent.click(button);

    await waitFor(() => {
      expect(button).toBeDisabled();
    });
  });

  it("calls the mutation on button click", async () => {
    renderComponent();

    userEvent.click(screen.getByRole("button", { name: "button text" }));

    await waitFor(() => {
      expect(mutationCalled).toBe(true);
    });
  });

  it("sets the team id if the accept property is true", async () => {
    updateProps({ accept: true });
    renderComponent();

    userEvent.click(screen.getByRole("button", { name: "button text" }));

    await waitFor(() => {
      expect(Storage.setItem).toHaveBeenCalledWith("team_id", "1");
    });
  });

  it("navigates to the next page if the accept property is true", async () => {
    updateProps({ accept: true });
    renderComponent();

    userEvent.click(screen.getByRole("button", { name: "button text" }));

    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledWith("/");
    });
  });

  it("does not set the team id the accept property is false", async () => {
    updateProps({ accept: false });
    renderComponent();

    userEvent.click(screen.getByRole("button", { name: "button text" }));

    await waitFor(() => {
      expect(Storage.setItem).toHaveBeenCalledTimes(0);
    });
  });
});
