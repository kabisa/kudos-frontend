import { MockedFunction, mockLocalstorage } from "../../../../spec_helper";
import { setComponent } from "../../../../support/testing/testComponent";
import {
  dataDecorator,
  tableDecorator,
} from "../../../../support/testing/testDecorators";
import { MemberRow } from "./MemberRow";
import { DEACTIVATE_USER } from "./Members";
import { screen, waitFor } from "@testing-library/react";

const membership = {
  id: "1",
  role: "member",
  user: {
    id: "1",
    name: "max",
    email: "max@example.com",
  },
};

let mutationCalled = false;
const mocks = [
  {
    request: {
      query: DEACTIVATE_USER,
      variables: { id: "1" },
    },
    result: () => {
      mutationCalled = true;
      return {
        data: {
          deleteTeamMember: {
            teamMemberId: "1",
          },
        },
      };
    },
  },
];

const refetch = jest.fn();

describe("<MemberRow />", () => {
  const { renderComponent } = setComponent(MemberRow, {
    decorators: [tableDecorator, dataDecorator(mocks)],
    props: {
      key: "1",
      membership,
      refetch,
    },
  });

  mockLocalstorage("5");

  beforeEach(() => {
    mutationCalled = false;
    global.confirm = jest.fn(() => true);

    renderComponent();
  });

  it("renders the membership information", () => {
    expect(screen.getByRole("cell", { name: "max" })).toBeInTheDocument();
    expect(
      screen.getByRole("cell", { name: "max@example.com" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "member" })).toBeInTheDocument();
  });

  it("calls the mutation on deactivation", async () => {
    const deactivateButton = screen.getByRole("button", { name: "delete" });
    deactivateButton.click();
    expect(global.confirm).toHaveBeenCalledWith(
      "Are you sure you want to delete this member?",
    );

    await waitFor(() => {
      expect(mutationCalled).toBe(true);
      expect(refetch).toHaveBeenCalledTimes(1);
    });
  });

  it("does not the delete mutation if confirm is cancelled", async () => {
    (global.confirm as MockedFunction<Window["confirm"]>).mockReturnValueOnce(
      true,
    );
    const deactivateButton = screen.getByRole("button", { name: "delete" });
    deactivateButton.click();

    await waitFor(() => expect(mutationCalled).toBe(true));
  });

  it("renders the buttons if the membership is not the current user", () => {
    mockLocalstorage("5");
    renderComponent();

    const buttons = screen.queryAllByRole("button");
    expect(buttons).toHaveLength(3);
  });

  it("does not render the buttons if the membership is the current user", () => {
    mockLocalstorage("1");
    renderComponent();

    const buttons = screen.queryAllByRole("button");
    expect(buttons).toHaveLength(0);
  });
});
