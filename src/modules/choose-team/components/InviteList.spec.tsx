import { withMockedProviders } from "../../../spec_helper";
import { InviteList } from "./index";
import { GET_INVITES } from "./InviteList";
import { render, RenderResult, screen, waitFor } from "@testing-library/react";

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

let wrapper: RenderResult | null = null;
const setup = async (mocks: any) => {
  if (wrapper) {
    await waitFor(() => {
      expect(screen.queryByText("Loading...")).toBeNull();
    });

    wrapper.unmount();
  }
  wrapper = render(withMockedProviders(<InviteList />, mocks));
};

describe("<InviteList />", () => {
  beforeEach(async () => {
    await setup(mockWithInvites);
  });

  it("renders the loading state", async () => {
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).toBeNull();
    });
  });

  it("renders the invites", async () => {
    const invites = await screen.findAllByTestId("kudo-invite");
    expect(invites).toHaveLength(2);
  });

  it("shows a message when there are no invites", async () => {
    await setup(mockWithoutInvites);
    await waitFor(() => {
      expect(screen.queryByText("Loading...")).toBeNull();
    });

    const invites = screen.queryAllByTestId("kudo-invite");
    expect(invites).toHaveLength(0);

    expect(screen.getByText("No invites.")).toBeInTheDocument();
  });

  it("shows when there is an error", async () => {
    await setup(mocksWithError);
    await waitFor(() => {
      expect(screen.queryByText("Loading...")).toBeNull();
    });

    expect(screen.getByText("It broke")).toBeInTheDocument();
  });
});
