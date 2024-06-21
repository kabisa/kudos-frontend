import { mockLocalstorage } from "../../../../spec_helper";
import {
  makeFC,
  setTestSubject,
} from "../../../../support/testing/testSubject";
import { dataDecorator } from "../../../../support/testing/testDecorators";
import MemberSection, { GET_USERS } from "./Members";
import { screen, waitFor } from "@testing-library/react";

export const mocks = () => [
  {
    request: {
      query: GET_USERS,
      variables: { id: "1" },
    },
    result: {
      data: {
        teamById: {
          memberships: [
            {
              id: "1",
              role: "member",
              user: {
                id: "1",
                name: "Max",
                email: "max@example.com",
              },
            },
            {
              id: "2",
              role: "admin",
              user: {
                id: "2",
                name: "Egon",
                email: "egon@example.com",
              },
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
      query: GET_USERS,
      variables: { id: "1" },
    },
    error: new Error("something went wrong"),
  },
];

describe("<Member />", () => {
  const { renderComponent, updateDecorator } = setTestSubject(
    makeFC(MemberSection),
    { decorators: [dataDecorator(mocks())], props: {} },
  );

  beforeEach(() => {
    mockLocalstorage("1");
  });

  it("shows a loading state", async () => {
    renderComponent();

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).toBeNull();
    });
  });

  it("shows when there is an error", async () => {
    updateDecorator("application", { mocks: mocksWithError });
    renderComponent();

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).toBeNull();
    });

    expect(
      await screen.findByText("Error! something went wrong"),
    ).toBeInTheDocument();
  });

  it("renders a row for each membership", async () => {
    renderComponent();

    // 1 header row, 2 data rows
    expect(await screen.findAllByRole("row")).toHaveLength(3);
  });
});
