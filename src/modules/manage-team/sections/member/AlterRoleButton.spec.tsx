import { mockLocalstorage, withMockedProviders } from "../../../../spec_helper";
import { AlterRoleButton, AlterRoleButtonMode } from "./AlterRoleButton";
import { ALTER_ROLE } from "./Members";
import { render, screen, waitFor } from "@testing-library/react";

const adminMembership = {
  id: "1",
  role: "admin",
  user: {
    id: "1",
    name: "Max",
    email: "max@example.com",
  },
};

const normalMembership = {
  id: "1",
  role: "member",
  user: {
    id: "1",
    name: "Max",
    email: "max@example.com",
  },
};
let mutationCalled = false;
const mocks = [
  {
    request: {
      query: ALTER_ROLE,
      variables: {
        role: "moderator",
        userId: "1",
        teamId: "1",
      },
    },
    result: () => {
      mutationCalled = true;
      return {
        data: {
          updateTeamMemberRole: {
            teamMember: {
              role: "moderator",
              id: "1",
            },
            errors: [],
          },
        },
      };
    },
  },
];

const refetch = jest.fn();

function setup(membership: any, mode: AlterRoleButtonMode) {
  return render(
    withMockedProviders(
      <AlterRoleButton refetch={refetch} membership={membership} mode={mode} />,
      mocks,
    ),
  );
}

describe("<AlterRoleButton />", () => {
  beforeEach(() => {
    mockLocalstorage("1");
    mutationCalled = false;
  });

  it("renders the promote button correctly", () => {
    setup(adminMembership, AlterRoleButtonMode.PROMOTE);

    const promoteButton = screen.getByRole("button", { name: "arrow_upward" });
    expect(promoteButton).toBeInTheDocument();
  });

  it("renders the demote button correctly", () => {
    setup(adminMembership, AlterRoleButtonMode.DEMOTE);
    const demoteButton = screen.getByRole("button", { name: "arrow_downward" });
    expect(demoteButton).toBeInTheDocument();
  });

  it("disables the promote button when the user is an admin", () => {
    setup(adminMembership, AlterRoleButtonMode.PROMOTE);

    const promoteButton = screen.getByRole("button", { name: "arrow_upward" });
    expect(promoteButton).toBeDisabled();
  });

  it("disables the demote button when the user is a member", () => {
    setup(normalMembership, AlterRoleButtonMode.DEMOTE);
    const demoteButton = screen.getByRole("button", { name: "arrow_downward" });

    expect(demoteButton).toBeDisabled();
  });

  it("calls the mutation", async () => {
    setup(normalMembership, AlterRoleButtonMode.PROMOTE);
    const promoteButton = screen.getByRole("button", { name: "arrow_upward" });
    promoteButton.click();

    await waitFor(() => {
      expect(mutationCalled).toBe(true);
      expect(refetch).toBeCalledTimes(1);
    });
  });
});
