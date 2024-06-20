import { setComponent } from "../../../support/testing/testComponent";
import { dataDecorator } from "../../../support/testing/testDecorators";
import { InviteList } from "./index";
import { GET_INVITES } from "./InviteList";
import { screen, waitFor } from "@testing-library/react";

const mockWithInvites = [
  {
    request: {
      query: GET_INVITES,
    },
    result: {
      data: {
        viewer: {
          teamInvites: [
            {
              id: "1",
              team: {
                id: "1",
                name: "Kabisa",
              },
            },
            {
              id: "2",
              team: {
                id: "2",
                name: "Dovetail",
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
      query: GET_INVITES,
    },
    error: new Error("It broke"),
  },
];

const mockWithoutInvites = [
  {
    request: {
      query: GET_INVITES,
    },
    result: {
      data: {
        viewer: {
          teamInvites: [],
        },
      },
    },
  },
];

describe("<InviteList />", () => {
  const { renderComponent, updateDecorator } = setComponent(InviteList, {
    decorators: [dataDecorator(mockWithInvites)],
    props: {},
  });

  it("renders the loading state", async () => {
    renderComponent();
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).toBeNull();
    });
  });

  it("renders the invites", async () => {
    renderComponent();

    const invites = await screen.findAllByTestId("kudo-invite");
    expect(invites).toHaveLength(2);
  });

  it("shows a message when there are no invites", async () => {
    updateDecorator("application", { mocks: mockWithoutInvites });
    renderComponent();

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).toBeNull();
    });

    const invites = screen.queryAllByTestId("kudo-invite");
    expect(invites).toHaveLength(0);

    expect(screen.getByText("No invites.")).toBeInTheDocument();
  });

  it("shows when there is an error", async () => {
    updateDecorator("application", { mocks: mocksWithError });
    renderComponent();

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).toBeNull();
    });

    expect(screen.getByText("It broke")).toBeInTheDocument();
  });
});
