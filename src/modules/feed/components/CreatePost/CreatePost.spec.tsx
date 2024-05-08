import { GraphQLError } from "graphql";
import {
  findByTestId,
  mockLocalstorage,
  wait,
  withMockedProviders,
} from "../../../../spec_helper";
import { CREATE_POST, CreatePost } from "./CreatePost";
import { GET_POSTS } from "../../queries";
import { fireEvent, render, screen } from "@testing-library/react";
import { mocks as guidelineMocks } from "../../../manage-team/sections/guideline/GuidelinesSection.spec";
import { mocksWithData as teamMemberMocks } from "../UserDropdown/UserDropdown.spec";
import userEvent from "@testing-library/user-event";

const DOWN_ARROW = { keyCode: 40 };

// let mutationCalled = false;
// let goalPercentageQueryCalled = false;
// let getPostQueryCalled = false;
const mocks = () => [
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
      // mutationCalled = true;
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
  // {
  //   request: {
  //     query: GET_GOAL_PERCENTAGE,
  //     variables: {
  //       team_id: "1",
  //     },
  //   },
  //   result: () => {
  //     // goalPercentageQueryCalled = true;
  //     return {
  //       data: {
  //         teamById: {
  //           __typename: "Team",
  //           activeKudosMeter: {
  //             amount: 1,
  //             __typename: "KudosMeter",
  //           },
  //           activeGoals: [
  //             {
  //               achievedOn: "2020-03-01",
  //               id: "1",
  //               name: "Goal",
  //               amount: 50,
  //               __typename: "Goal",
  //             },
  //           ],
  //         },
  //       },
  //     };
  //   },
  // },
  {
    request: {
      query: GET_POSTS,
      variables: {
        team_id: "1",
      },
    },
    result: () => {
      // getPostQueryCalled = true;
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

describe("<CreatePost />", () => {
  beforeEach(() => {
    mockLocalstorage("1");
    // mutationCalled = false;
    // goalPercentageQueryCalled = false;
    // getPostQueryCalled = false;
    // mockCache = getMockCache();
    render(
      withMockedProviders(
        <CreatePost back={false} />,
        [...mocks(), ...guidelineMocks("1"), ...teamMemberMocks("1")],
        // mockCache, true,
      ),
    );
  });

  const setKudoAmount = async () => {
    const amountInput = await screen.findByRole("combobox", {
      description: "Kudos amount",
    });
    fireEvent.keyDown(amountInput, DOWN_ARROW);

    const kudoAmountOption = await screen.findByText("first guideline: 5");
    kudoAmountOption.click();
  };

  const setReceiver = async (name: string) => {
    const receiverInput = await screen.findByRole("combobox", {
      description: "Receivers",
    });
    fireEvent.keyDown(receiverInput, DOWN_ARROW);

    const kudoMemberOption = await screen.findByText(name);
    kudoMemberOption.click();
  };

  const setMessage = async (text: string) => {
    const messageInput = await screen.findByRole("textbox");
    fireEvent.change(messageInput, { target: { value: text } });
  };

  const pressSubmit = async () => {
    const submitButton = await screen.findByRole("button", {
      name: "DROP YOUR KUDOS HERE",
    });
    submitButton.click();
  };

  it("shows a message if the amount is null", async () => {
    await pressSubmit();

    const errorMessage = await screen.findByText("Amount can't be empty or 0.");
    expect(errorMessage).toBeInTheDocument();
  });

  it("shows a message if there are no receivers", async () => {
    await setKudoAmount();
    await pressSubmit();

    const errorMessage = await screen.findByText(
      "You must select at least one receiver.",
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it("shows a warning if there is no message", async () => {
    await setKudoAmount();
    await setReceiver("Egon");
    await pressSubmit();

    const errorMessage = await screen.findByText("Message can't be blank.");
    expect(errorMessage).toBeInTheDocument();
  });

  it("shows a warning if the message is too short", async () => {
    await setKudoAmount();
    await setReceiver("Egon");
    await setMessage("Oi");

    await pressSubmit();

    const errorMessage = await screen.findByText(
      "Message must be at least 4 characters.",
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it("shows a warning if the message is too long", async () => {
    await setKudoAmount();
    await setReceiver("Egon");
    await setMessage(
      // eslint-disable-next-line max-len
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    );

    await pressSubmit();

    const errorMessage = await screen.findByText(
      "Message can have a maximum of 140 characters.",
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it.skip("shows when the mutation is loading", async () => {
    /*
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
    */
  });

  it.skip("shows when there is an error", async () => {
    /*
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
    */
  });

  it.skip("calls the mutation and the refetch queries", async () => {
    /*
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
    */
  });
});
