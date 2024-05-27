import { mockLocalstorage, withMockedProviders } from "../../../../spec_helper";
import MemberSection, { GET_USERS } from "./Members";
import { RenderResult, render, screen, waitFor } from "@testing-library/react";

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

type GraphQLData = {
  request: {
    query: unknown;
    variables?: unknown;
  };
  error?: unknown;
  result?: {
    data: unknown;
  };
};

let renderResult: RenderResult | null = null;
const setup = async (mockData: GraphQLData[] = mocks()) => {
  if (renderResult) {
    await waitFor(() => {
      expect(screen.queryByText("Loading...")).toBeNull();
    });
    renderResult.unmount();
  }
  renderResult = render(withMockedProviders(<MemberSection />, mockData));
};

describe("<Member />", () => {
  beforeEach(async () => {
    mockLocalstorage("1");
    await setup();
  });

  it("shows a loading state", async () => {
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).toBeNull();
    });
  });

  it("shows when there is an error", async () => {
    await setup(mocksWithError);
    await waitFor(() => {
      expect(screen.queryByText("Loading...")).toBeNull();
    });

    expect(
      await screen.findByText("Error! something went wrong"),
    ).toBeInTheDocument();
  });

  it("renders a row for each membership", async () => {
    // 1 header row, 2 data rows
    expect(await screen.findAllByRole("row")).toHaveLength(3);
  });
});
