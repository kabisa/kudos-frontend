import { CreateInvite, MUTATION_CREATE_INVITE } from "./CreateInvite";
import { mockLocalstorage } from "../../../../spec_helper";
import { QUERY_GET_INVITES } from "./InvitesSection";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import {
  makeFC,
  setComponent,
} from "../../../../support/testing/testComponent";
import { dataDecorator } from "../../../../support/testing/testDecorators";

let mutationCalled = false;
const mocks = [
  {
    request: {
      query: MUTATION_CREATE_INVITE,
      variables: {
        emails: ["max@example.com"],
        team_id: "1",
      },
    },
    result: () => {
      mutationCalled = true;
      return {
        data: {
          createTeamInvite: {
            teamInvites: [
              {
                id: "1",
              },
            ],
          },
        },
      };
    },
  },
  {
    request: {
      query: QUERY_GET_INVITES,
      variables: {
        team_id: "1",
      },
    },
    result: {
      data: {
        teamById: {
          teamInvites: [
            {
              id: "1",
              acceptedAt: "2020-03-10",
              declinedAt: "",
              email: "max@example.com",
              sentAt: "2020-03-01",
            },
          ],
        },
      },
    },
  },
];

describe("<InvitePage />", () => {
  const mockRefetch = jest.fn();

  const { renderComponent } = setComponent(makeFC(CreateInvite), {
    decorators: [dataDecorator(mocks)],
    props: {
      refetch: mockRefetch,
    },
  });

  beforeEach(() => {
    mockLocalstorage("1");
    mutationCalled = false;
    renderComponent();
  });

  it("renders the e-mail input field", () => {
    const emailInput = screen.getByRole("textbox", { name: "Email addresses" });
    expect(emailInput).toBeInTheDocument();
  });

  it("renders the send button", () => {
    const sendButton = screen.getByRole("button", { name: "Invite" });
    expect(sendButton).toBeInTheDocument();
  });

  it("displays an error if the email field is empty", async () => {
    const sendButton = screen.getByRole("button", { name: "Invite" });
    sendButton.click();

    expect(
      await screen.findByRole("heading", { name: "Unable to send invites" }),
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Email can't be blank."),
    ).toBeInTheDocument();
  });

  it("disables the send button when the mutation is called", () => {
    const emailInput = screen.getByRole("textbox", { name: "Email addresses" });
    fireEvent.change(emailInput, { target: { value: "max@example.com" } });

    const sendButton = screen.getByRole("button", { name: "Invite" });
    sendButton.click();

    expect(sendButton).toBeDisabled();
  });

  it("shows an error if an email is invalid", async () => {
    const emailInput = screen.getByRole("textbox", { name: "Email addresses" });
    fireEvent.change(emailInput, { target: { value: "invalidEmail" } });

    const sendButton = screen.getByRole("button", { name: "Invite" });
    sendButton.click();

    expect(
      await screen.findByRole("heading", { name: "Unable to send invites" }),
    ).toBeInTheDocument();
  });

  it("shows an error if multiple emails are invalid", async () => {
    const emailInput = screen.getByRole("textbox", { name: "Email addresses" });
    fireEvent.change(emailInput, {
      target: { value: "invalidEmail, otherFakeEmail" },
    });

    const sendButton = screen.getByRole("button", { name: "Invite" });
    sendButton.click();

    expect(
      await screen.findByRole("heading", { name: "Unable to send invites" }),
    ).toBeInTheDocument();
  });

  it("calls the mutation if all requirements are met", async () => {
    const emailInput = screen.getByRole("textbox", { name: "Email addresses" });
    fireEvent.change(emailInput, { target: { value: "max@example.com" } });

    const sendButton = screen.getByRole("button", { name: "Invite" });
    sendButton.click();

    await waitFor(() => {
      expect(mutationCalled).toBe(true);
    });
  });

  it("only uses valid email addresses when multiple are entered", async () => {
    const emailInput = screen.getByRole("textbox", { name: "Email addresses" });
    fireEvent.change(emailInput, {
      target: { value: "max@example.com;invalidEmail,otherFakeEmail" },
    });

    const sendButton = screen.getByRole("button", { name: "Invite" });
    sendButton.click();

    await waitFor(() => {
      expect(mutationCalled).toBe(true);
    });
  });
});
