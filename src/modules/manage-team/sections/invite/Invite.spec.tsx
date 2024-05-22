import { act } from "react-dom/test-utils";
import {
  findByTestId,
  mockLocalstorage,
  wait,
  withMockedProviders,
} from "../../../../spec_helper";
import { Invite, MUTATION_DELETE_INVITE } from "./Invite";
import { InviteModel, QUERY_GET_INVITES } from "./InvitesSection";
import { render, screen, waitFor } from "@testing-library/react";

const pendingInvite: InviteModel = {
  acceptedAt: "",
  declinedAt: "",
  email: "pending@example.com",
  id: 1,
  sentAt: "2020-03-10",
};

const acceptedInvite: InviteModel = {
  acceptedAt: "2020-03-15",
  declinedAt: "",
  email: "accepted@example.com",
  id: 2,
  sentAt: "2020-03-10",
};

const declinedInvite: InviteModel = {
  acceptedAt: "",
  declinedAt: "2020-03-15",
  email: "declined@example.com",
  id: 3,
  sentAt: "2020-03-10",
};

let mutationCalled = false;
let queryCalled = false;
const mocks = [
  {
    request: {
      query: MUTATION_DELETE_INVITE,
      variables: { id: 1 },
    },
    result: () => {
      mutationCalled = true;
      return {
        data: {
          deleteTeamInvite: {
            teamInviteId: "1",
          },
        },
      };
    },
  },
  {
    request: {
      query: QUERY_GET_INVITES,
      variables: { team_id: "1" },
    },
    result: () => {
      queryCalled = true;
      return {
        data: {
          teamById: {
            teamInvites: [
              {
                acceptedAt: "",
                declinedAt: "",
                email: "max@example.com",
                id: "1",
                sentAt: "2020-03-01",
              },
            ],
          },
        },
      };
    },
  },
];

describe("<Invite />", () => {
  function setup(invite: InviteModel) {
    const mockRefetch = jest.fn();

    render(
      withMockedProviders(
        <table>
          <tbody>
            <Invite invite={invite} key={1} refetch={mockRefetch} />
          </tbody>
        </table>,
        mocks,
      ),
    );
  }

  beforeEach(() => {
    global.confirm = jest.fn(() => true);
    mockLocalstorage("1");
    mutationCalled = false;
    queryCalled = false;
    setup(pendingInvite);
  });

  it("shows the invite send date and email", () => {
    const date = screen.getByRole("cell", { name: "2020-03-10" });
    expect(date).toBeInTheDocument();

    const email = screen.getByRole("cell", { name: "pending@example.com" });
    expect(email).toBeInTheDocument();
  });

  it("shows that the invite is pending", () => {
    const status = screen.getByRole("cell", { name: "Pending" });
    expect(status).toBeInTheDocument();
  });

  it("shows that the invite is accepted", () => {
    setup(acceptedInvite);

    const status = screen.getByRole("cell", { name: "Accepted" });
    expect(status).toBeInTheDocument();
  });

  it("shows that the invite is declined", () => {
    setup(declinedInvite);

    const status = screen.getByRole("cell", { name: "Declined" });
    expect(status).toBeInTheDocument();
  });

  it("has a confirm delete button", async () => {
    const button = screen.getByRole("button", { name: "delete" });
    expect(button).toBeInTheDocument();

    button.click();

    await waitFor(() => {
      expect(global.confirm).toHaveBeenCalledWith(
        "Are you sure you want to delete this invite?",
      );
    });
  });

  it("calls the delete mutation", async () => {
    const button = screen.getByRole("button", { name: "delete" });
    expect(button).toBeInTheDocument();

    button.click();

    await waitFor(() => {
      expect(mutationCalled).toBe(true);
      expect(queryCalled).toBe(true);
    });
  });
});
