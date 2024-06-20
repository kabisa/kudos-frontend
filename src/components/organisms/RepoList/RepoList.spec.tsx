import { screen } from "@testing-library/react";
import { GET_POSTS } from "../../../modules/feed/queries";
import { mockLocalstorage } from "../../../spec_helper";
import { RepoList } from "./RepoList";
import { setComponent } from "../../../support/testing/testComponent";
import { dataDecorator } from "../../../support/testing/testDecorators";

export const mocks = (hasNextPage: boolean) => [
  {
    request: {
      query: GET_POSTS,
      variables: { team_id: "1" },
    },
    result: {
      data: {
        teamById: {
          __typename: "Team",
          id: "1",
          posts: {
            __typename: "Posts",
            edges: [
              {
                __typename: "Edge",
                cursor: "1",
                node: {
                  __typename: "Post",
                  id: "1",
                  amount: 5,
                  message: "test message",
                  createdAt: "2020-03-10",
                  images: [],
                  receivers: [
                    {
                      id: "1",
                      name: "Stefan",
                      email: "stefan@example.com",
                      avatar: "fakeAvatar",
                      __typename: "User",
                    },
                  ],
                  sender: {
                    id: "1",
                    name: "Max",
                    email: "max@example.com",
                    avatar: "fakeAvatar",
                    __typename: "User",
                  },
                  votes: [
                    {
                      __typename: "Vote",
                      voter: {
                        id: "5",
                        name: "Egon",
                        __typename: "Voter",
                      },
                    },
                  ],
                },
              },
            ],
            pageInfo: {
              endCursor: "2",
              hasNextPage,
              __typename: "PageInfo",
            },
          },
        },
      },
    },
  },
];

const mocksWithError = [
  {
    request: {
      query: GET_POSTS,
      variables: { team_id: "1" },
    },
    error: new Error("It broke"),
  },
];

describe("<RepoList />", () => {
  const { renderComponent, updateDecorator } = setComponent(RepoList, {
    decorators: [dataDecorator(mocks(false))],
    props: {},
  });

  beforeEach(() => {
    mockLocalstorage("1");
  });

  it("shows loading when the query is loading", async () => {
    renderComponent();

    const element = screen.getByText("Loading..");
    expect(element).toBeInTheDocument();

    // Wait to prevent unmount while fetching (causes State update on unmounted component)
    await screen.findAllByTestId("kudo-transaction");
  });

  it("shows show the error message when there is an error", async () => {
    updateDecorator("application", { mocks: mocksWithError });
    renderComponent();

    const element = await screen.findByText("It broke");
    expect(element).toBeInTheDocument();
  });

  it("renders all the posts", async () => {
    renderComponent();

    const elements = await screen.findAllByTestId("kudo-transaction");
    expect(elements).toHaveLength(1);
  });

  it("shows a load next button when there are more posts", async () => {
    updateDecorator("application", { mocks: mocks(true) });
    renderComponent();

    const nextPageButton = await screen.findByTestId("next-page-button");
    expect(nextPageButton).toBeInTheDocument();
  });

  it("should not show a load next button when there are no more posts", async () => {
    renderComponent();

    const nextPageButton = screen.queryByTestId("next-page-button");
    expect(nextPageButton).toBeNull();

    const element = await screen.findByText(
      "You've reached the end, congratulations!",
    );
    expect(element).toBeInTheDocument();
  });
});
