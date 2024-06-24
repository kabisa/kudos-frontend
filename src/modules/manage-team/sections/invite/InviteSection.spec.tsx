import { mockLocalstorage } from "../../../../spec_helper";
import { setTestSubject } from "../../../../support/testing/testSubject";
import { dataDecorator } from "../../../../support/testing/testDecorators";
import InviteSection, { QUERY_GET_INVITES } from "./InvitesSection";
import { screen, waitFor } from "@testing-library/react";

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
  const { renderComponent, updateDecorator } = setTestSubject(InviteSection, {
    decorators: [dataDecorator(mocks)],
    props: {},
  });

  beforeEach(() => {
    mockLocalstorage("1");
  });

  it("shows a loading message", async () => {
    renderComponent();

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).toBeNull();
    });
  });

  it("shows when there is an error", async () => {
    updateDecorator("application", { mocks: mocksWithError });
    renderComponent();

    expect(await screen.findByText("Error! it broke")).toBeInTheDocument();
  });

  it("renders a row for each invite", async () => {
    renderComponent();

    // header row + 2 data rows
    expect(await screen.findAllByRole("row")).toHaveLength(1 + 2);
  });

  it("renders the add invites section", async () => {
    renderComponent();

    expect(
      await screen.findByRole("button", { name: "Invite" }),
    ).toBeInTheDocument();
  });
});
