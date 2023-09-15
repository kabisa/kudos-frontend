import { mount, ReactWrapper } from "enzyme";
import { act } from "react-dom/test-utils";
import { GET_POSTS } from "../../../modules/feed/queries";
import {
  findByTestId,
  mockLocalstorage,
  wait,
  withMockedProviders,
} from "../../../spec_helper";
import { RepoList } from "./RepoList";

const mocks = (hasNextPage: boolean) => [
  {
    request: {
      query: GET_POSTS,
      variables: { team_id: "1" },
    },
    result: {
      data: {
        teamById: {
          __typename: "Team",
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

let wrapper: ReactWrapper;

const setup = (mock: any) => {
  wrapper = mount(withMockedProviders(<RepoList />, mock, undefined, true));
};

describe("<RepoList />", () => {
  beforeEach(() => {
    mockLocalstorage("1");
    setup(mocks(false));
  });

  it("should show loading when the query is loading", async () => {
    expect(wrapper.containsMatchingElement(<div>Loading</div>)).toBe(true);
  });

  it("should show the error message when there is an error", async () => {
    setup(mocksWithError);
    await act(async () => {
      await wait(0);
      await wrapper.update();

      expect(wrapper.containsMatchingElement(<p>It broke</p>)).toBe(true);
    });
  });

  it("should render all the posts", async () => {
    await act(async () => {
      await wait(0);
      await wrapper.update();

      expect(wrapper.find("Transaction").length).toBe(1);
    });
  });

  it("should show a load next button when there are more posts", async () => {
    setup(mocks(true));
    await act(async () => {
      await wait(0);
      await wrapper.update();

      expect(findByTestId(wrapper, "next-page-button").length).toBe(1);
    });
  });

  it("should not show a load next button when there are no more posts", async () => {
    await act(async () => {
      await wait(0);
      await wrapper.update();

      expect(findByTestId(wrapper, "next-page-button").length).toBe(0);
      expect(
        wrapper.containsMatchingElement(
          <p>You&apos;ve reached the end, congratulations!</p>,
        ),
      ).toBe(true);
    });
  });
});
