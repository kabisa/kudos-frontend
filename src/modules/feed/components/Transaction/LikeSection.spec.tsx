import { mount, ReactWrapper } from "enzyme";
import {
  findByTestId,
  mockLocalstorage,
  withMockedProviders,
} from "../../../../spec_helper";
import LikeSection, { MUTATION_TOGGLE_LIKE } from "./LikeSection";
import {
  FragmentPostResult,
  GET_GOAL_PERCENTAGE,
  GET_POSTS,
} from "../../queries";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InMemoryCache } from "@apollo/client";

const likedPost: FragmentPostResult = {
  id: "1",
  amount: 5,
  message: "test message",
  createdAt: "2020-03-10",
  images: [],
  receivers: [
    {
      id: "1",
      name: "Stefan",
      avatar: "fakeAvatar",
    },
  ],
  sender: {
    id: "5",
    name: "Max",
    avatar: "fakeAvatar",
  },
  votes: [
    {
      voter: {
        id: "5",
        name: "Max",
      },
    },
  ],
};

let mutationCalled = false;
const mocks = [
  {
    request: {
      query: MUTATION_TOGGLE_LIKE,
      variables: { id: "1" },
    },
    result: () => {
      mutationCalled = true;
      return {
        data: {
          toggleLikePost: {
            post: {
              ...likedPost,
            },
          },
        },
      };
    },
  },
  {
    request: {
      query: GET_GOAL_PERCENTAGE,
      variables: { team_id: "1" },
    },
    result: () => {
      mutationCalled = true;
      return {
        data: {
          teamById: {
            activeKudosMeter: {
              amount: 20,
            },
            activeGoals: [
              {
                id: "1",
                amount: 50,
                name: "test",
                achievedOn: "",
              },
            ],
          },
        },
      };
    },
  },
];

let wrapper: ReactWrapper;

describe("<LikeButton />", () => {
  beforeEach(() => {
    mutationCalled = false;
    mockLocalstorage("1");
  });

  it("renders the correct message", () => {
    wrapper = mount(
      withMockedProviders(<LikeSection post={likedPost} />, mocks),
    );

    expect(findByTestId(wrapper, "message").text()).toBe("+1₭ by Max");
  });

  it("renders the correct like icon if the post is not liked", () => {
    wrapper = mount(
      withMockedProviders(<LikeSection post={likedPost} />, mocks),
    );
    expect(findByTestId(wrapper, "like-button").prop("liked")).toBe(false);
    expect(
      findByTestId(wrapper, "like-icon").children().prop("className"),
    ).toContain("material-symbols-rounded-outlined");
  });

  it("renders the correct like icon if the post is liked", () => {
    mockLocalstorage("5");
    wrapper = mount(
      withMockedProviders(<LikeSection post={likedPost} />, mocks),
    );

    expect(findByTestId(wrapper, "like-button").prop("liked")).toBe(true);
    expect(
      findByTestId(wrapper, "like-icon").children().prop("className"),
    ).toContain("material-symbols-rounded");
  });

  it.skip("calls the mutation", async () => {
    const cache = new InMemoryCache({
      addTypename: false,
      typePolicies: {
        Query: {
          fields: {
            teamById: {
              read(_, { args, toReference }) {
                return toReference({
                  __typename: "Team",
                  id: args?.id,
                });
              },
            },
          },
        },
      },
    });

    cache.writeQuery({
      query: GET_POSTS,
      variables: { team_id: "1" },
      data: {
        teamById: {
          id: "1",
          __typename: "Team",
          posts: {
            edges: [
              {
                cursor: "x",
                node: {
                  ...likedPost,
                },
              },
            ],
            pageInfo: {
              endCursor: "2",
              hasNextPage: false,
            },
          },
        },
      },
    });

    render(withMockedProviders(<LikeSection post={likedPost} />, mocks, cache));
    screen.findAllByTestId("like-button").then((res) => console.log(res));
    const button = screen.getByTestId("like-button");

    await act(async () => userEvent.click(button));

    expect(mutationCalled).toBe(true);
  });
});
