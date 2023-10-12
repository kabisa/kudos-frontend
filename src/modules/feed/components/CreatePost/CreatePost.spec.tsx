import { mount, ReactWrapper } from "enzyme";
import { act } from "react-dom/test-utils";
import { GraphQLError } from "graphql";
import {
  findByTestId,
  getMockCache,
  mockLocalstorage,
  wait,
  withMockedProviders,
} from "../../../../spec_helper";
import { CREATE_POST, CreatePost } from "./CreatePost";
import { GET_GOAL_PERCENTAGE, GET_POSTS } from "../../queries";

let mutationCalled = false;
let goalPercentageQueryCalled = false;
let getPostQueryCalled = false;
const mocks = [
  {
    request: {
      query: CREATE_POST,
      variables: {
        message: "Some message",
        kudos: 5,
        images: [],
        receivers: ["4"],
        virtual_receivers: [],
        team_id: "1",
      },
    },
    result: () => {
      mutationCalled = true;
      return {
        data: {
          createPost: {
            post: {
              id: "1",
              amount: 5,
              __typename: "Post",
            },
            __typename: "CreatePost",
          },
        },
      };
    },
  },
  {
    request: {
      query: GET_GOAL_PERCENTAGE,
      variables: {
        team_id: "1",
      },
    },
    result: () => {
      goalPercentageQueryCalled = true;
      return {
        data: {
          teamById: {
            __typename: "Team",
            activeKudosMeter: {
              amount: 1,
              __typename: "KudosMeter",
            },
            activeGoals: [
              {
                achievedOn: "2020-03-01",
                id: "1",
                name: "Goal",
                amount: 50,
                __typename: "Goal",
              },
            ],
          },
        },
      };
    },
  },
  {
    request: {
      query: GET_POSTS,
      variables: {
        team_id: "1",
      },
    },
    result: () => {
      getPostQueryCalled = true;
      return {
        data: {
          teamById: {
            __typename: "Team",
            posts: {
              __typename: "Posts",
              edges: [
                {
                  __typename: "Edge",
                  cursor: "x",
                  node: {
                    __typename: "Post",
                    id: "1",
                    amount: 5,
                    message: "test message",
                    createdAt: "2020-03-10",
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
                hasNextPage: false,
                __typename: "PageInfo",
              },
            },
          },
        },
      };
    },
  },
];
const mocksWithError = [
  {
    request: {
      query: CREATE_POST,
      variables: {
        message: "Some message",
        kudos: 5,
        receivers: ["4"],
        virtual_receivers: [],
        team_id: "1",
      },
    },
    result: {
      errors: [new GraphQLError("It broke")],
    },
  },
];

let mockCache: any;

describe.skip("<CreatePost />", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    mockLocalstorage("1");
    mutationCalled = false;
    goalPercentageQueryCalled = false;
    getPostQueryCalled = false;
    mockCache = getMockCache();
    wrapper = mount(
      withMockedProviders(<CreatePost back={false} />, mocks, mockCache, true),
    );
  });

  it("shows a message if the amount is null", async () => {
    const component = wrapper.find("CreatePost").instance();

    await act(async () => {
      component.setState({
        amount: "",
        receivers: ["1"],
        message: "Some message",
      });
      await wrapper.update();

      findByTestId(wrapper, "submit-button").hostNodes().simulate("submit");
      await wrapper.update();

      expect(findByTestId(wrapper, "error-message").text()).toBe(
        "Amount can't be empty or 0.",
      );
    });
  });

  it("shows a message if there are no receivers", async () => {
    const component = wrapper.find("CreatePost").instance();

    await act(async () => {
      component.setState({
        amount: "5",
        receivers: [],
        message: "Some message",
      });
      await wrapper.update();

      findByTestId(wrapper, "submit-button").hostNodes().simulate("submit");
      await wrapper.update();

      expect(findByTestId(wrapper, "error-message").text()).toBe(
        "You must select at least one receiver.",
      );
    });
  });

  it("shows a warning if the message is too short", async () => {
    const component = wrapper.find("CreatePost").instance();

    await act(async () => {
      component.setState({ amount: "5", receivers: ["1"], message: "a" });
      await wrapper.update();

      findByTestId(wrapper, "submit-button").hostNodes().simulate("submit");
      await wrapper.update();

      expect(findByTestId(wrapper, "error-message").text()).toBe(
        "Message must be at least 4 characters.",
      );
    });
  });

  it("shows a warning if the message is too long", async () => {
    const component = wrapper.find("CreatePost").instance();

    await act(async () => {
      // eslint-disable-next-line max-len
      component.setState({
        amount: "5",
        receivers: ["1"],
        message:
          // eslint-disable-next-line max-len
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      });
      await wrapper.update();

      findByTestId(wrapper, "submit-button").hostNodes().simulate("submit");
      await wrapper.update();

      expect(findByTestId(wrapper, "error-message").text()).toBe(
        "Message can have a maximum of 140 characters.",
      );
    });
  });

  it("shows when the mutation is loading", async () => {
    const component = wrapper.find("CreatePost").instance();

    await act(async () => {
      component.setState({
        amount: "5",
        receivers: ["4"],
        message: "Some message",
      });
      await wrapper.update();

      findByTestId(wrapper, "submit-button").hostNodes().simulate("submit");
      await wrapper.update();

      expect(
        findByTestId(wrapper, "submit-button").hostNodes().hasClass("loading"),
      ).toBe(true);
    });
  });

  it("shows when there is an error", async () => {
    wrapper = mount(
      withMockedProviders(
        <CreatePost back={false} />,
        mocksWithError,
        mockCache,
        true,
      ),
    );
    const component = wrapper.find("CreatePost").instance();

    await act(async () => {
      component.setState({
        amount: "5",
        receivers: ["4"],
        message: "Some message",
      });
      await wrapper.update();

      findByTestId(wrapper, "submit-button").hostNodes().simulate("submit");
      await wait(0);
      await wrapper.update();

      expect(findByTestId(wrapper, "error-message").text()).toBe(
        "Something went wrong.",
      );
    });
  });

  it("calls the mutation and the refetch queries", async () => {
    const component = wrapper.find("CreatePost").instance();

    await act(async () => {
      component.setState({
        amount: 5,
        receivers: ["4"],
        message: "Some message",
      });
      await wrapper.update();

      findByTestId(wrapper, "submit-button").hostNodes().simulate("submit");
      await wait(0);
      await wrapper.update();

      expect(mutationCalled).toBe(true);

      await wait(0);
      await wrapper.update();

      expect(goalPercentageQueryCalled).toBe(true);
      expect(getPostQueryCalled).toBe(true);
    });
  });
});
