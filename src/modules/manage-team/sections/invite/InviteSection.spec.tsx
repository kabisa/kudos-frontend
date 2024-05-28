import { mockLocalstorage, withMockedProviders } from "../../../../spec_helper";
import InviteSection, { QUERY_GET_INVITES } from "./InvitesSection";
import { render, screen, waitFor } from "@testing-library/react";

const mocks = [
  {
    request: {
      query: QUERY_GET_INVITES,
      variables: { team_id: "1" },
    },
    result: {
      data: {
        teamById: {
          teamInvites: [
            {
              acceptedAt: "2020-3-15",
              declinedAt: "",
              email: "max@example.com",
              id: 1,
              sentAt: "2020-03-10",
            },
            {
              acceptedAt: "2020-3-16",
              declinedAt: "",
              email: "egon@example.com",
              id: 2,
              sentAt: "2020-03-11",
            },
          ],
        },
      },
    },
  },
];

const mocksWithError = [
  {
    request: {
      query: QUERY_GET_INVITES,
      variables: { team_id: "1" },
    },
    error: new Error("it broke"),
  },
];

describe("<InviteSection />", () => {
  beforeEach(() => {
    mockLocalstorage("1");
    render(withMockedProviders(<InviteSection />, mocks));
  });

  it("shows a loading message", async () => {
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).toBeNull();
    });
  });

  it("shows when there is an error", async () => {
    render(withMockedProviders(<InviteSection />, mocksWithError));
    expect(await screen.findByText("Error! it broke")).toBeInTheDocument();
  });

  it("renders a row for each invite", async () => {
    // header row + 2 data rows
    expect(await screen.findAllByRole("row")).toHaveLength(1 + 2);
  });

  it("renders the add invites section", async () => {
    expect(
      await screen.findByRole("button", { name: "Invite" }),
    ).toBeInTheDocument();
  });
});
