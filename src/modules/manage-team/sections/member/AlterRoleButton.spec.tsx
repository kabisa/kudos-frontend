import { mockLocalstorage } from "../../../../spec_helper";
import { setComponent } from "../../../../support/testing/testComponent";
import { applicationContext } from "../../../../support/testing/testContexts";
import { AlterRoleButton, AlterRoleButtonMode } from "./AlterRoleButton";
import { ALTER_ROLE } from "./Members";
import { screen, waitFor } from "@testing-library/react";

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

describe("<AlterRoleButton />", () => {
  const { setProps, renderComponent, updateProps } = setComponent(
    AlterRoleButton,
    applicationContext(mocks),
  );
  setProps({
    refetch,
    membership: adminMembership,
    mode: AlterRoleButtonMode.PROMOTE,
  });

  beforeEach(() => {
    mockLocalstorage("1");
    mutationCalled = false;
  });

  it("renders the promote button correctly", () => {
    renderComponent();

    const promoteButton = screen.getByRole("button", { name: "arrow_upward" });
    expect(promoteButton).toBeInTheDocument();
  });

  it("renders the demote button correctly", () => {
    updateProps({ mode: AlterRoleButtonMode.DEMOTE });
    renderComponent();

    const demoteButton = screen.getByRole("button", { name: "arrow_downward" });
    expect(demoteButton).toBeInTheDocument();
  });

  it("disables the promote button when the user is an admin", () => {
    renderComponent();

    const promoteButton = screen.getByRole("button", { name: "arrow_upward" });
    expect(promoteButton).toBeDisabled();
  });

  it("disables the demote button when the user is a member", () => {
    updateProps({
      membership: normalMembership,
      mode: AlterRoleButtonMode.DEMOTE,
    });
    renderComponent();

    const demoteButton = screen.getByRole("button", { name: "arrow_downward" });

    expect(demoteButton).toBeDisabled();
  });

  it("calls the mutation", async () => {
    updateProps({
      membership: normalMembership,
      mode: AlterRoleButtonMode.PROMOTE,
    });
    renderComponent();

    const promoteButton = screen.getByRole("button", { name: "arrow_upward" });
    promoteButton.click();

    await waitFor(() => {
      expect(mutationCalled).toBe(true);
      expect(refetch).toHaveBeenCalledTimes(1);
    });
  });
});
