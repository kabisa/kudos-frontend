import { mockLocalstorage } from "../../../../spec_helper";
import LikeButton, { MUTATION_TOGGLE_LIKE } from "./LikeButton";
import {
  FragmentPostResult,
  GET_GOAL_PERCENTAGE,
  GET_POSTS,
} from "../../queries";
import { screen, waitFor } from "@testing-library/react";
import { InMemoryCache } from "@apollo/client";
import {
  makeFC,
  setTestSubject,
} from "../../../../support/testing/testSubject";
import { dataDecorator } from "../../../../support/testing/testDecorators";

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
    id: "1",
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

describe("<LikeButton />", () => {
  const { renderComponent, updateProps, updateDecorator } = setTestSubject(
    makeFC(LikeButton),
    {
      decorators: [dataDecorator(mocks)],
      props: {
        liked: false,
        post: likedPost,
      },
    },
  );

  beforeEach(() => {
    mutationCalled = false;
    mockLocalstorage("1");
  });

  it("renders the correct message", async () => {
    renderComponent();

    const message = await screen.findByTestId("message");

    expect(message.textContent).toBe("+1₭ by Max");
  });

  it("renders the correct like icon if the post is not liked", async () => {
    renderComponent();

    const likeButton = await screen.findByRole("button");

    const icon = likeButton.querySelector(
      "span[class*='material-symbols-rounded']",
    );
    expect(icon?.textContent).toBe("thumb_up");
    expect(icon?.getAttribute("class")).toContain(
      "material-symbols-rounded-outline",
    );
  });

  it("renders the correct like icon if the post is liked", async () => {
    updateProps({ liked: true });
    renderComponent();

    const likeButton = await screen.findByRole("button");
    const icon = likeButton.querySelector(
      "span[class*='material-symbols-rounded']",
    );
    expect(icon?.textContent).toBe("thumb_up");
    expect(icon?.getAttribute("class")).not.toContain(
      "material-symbols-rounded-outline",
    );
  });

  it("calls the mutation", async () => {
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

    updateDecorator("application", { cache: cache });
    renderComponent();

    const likeButton = await screen.findByRole("button");
    likeButton.click();

    waitFor(() => {
      expect(mutationCalled).toBe(true);
    });
  });
});
