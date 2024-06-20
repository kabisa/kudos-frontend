import { GraphQLError } from "graphql";
import { mockLocalstorage } from "../../../../spec_helper";
import { CREATE_POST, CreatePost } from "./CreatePost";
import { GET_POSTS } from "../../queries";
import { fireEvent, screen } from "@testing-library/react";
import { mocks as guidelineMocks } from "../../../manage-team/sections/guideline/GuidelinesSection.spec";
import { mocksWithData as teamMemberMocks } from "../UserDropdown/UserDropdown.spec";
import {
  getSelectOptions,
  openSelect,
} from "../../../../support/testing/reactSelectHelpers";
import { dataDecorator } from "../../../../support/testing/testDecorators";
import {
  makeFC,
  setComponent,
} from "../../../../support/testing/testComponent";

const mocks = () => [
  {
    request: {
      query: CREATE_POST,
      variables: {
        message: "Some message",
        kudos: 5,
        images: [],
        receivers: ["2"],
        virtual_receivers: [],
        team_id: "1",
      },
    },
    result: {
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
        receivers: ["2"],
        virtual_receivers: [],
        team_id: "1",
      },
    },
    result: {
      errors: [new GraphQLError("It broke")],
    },
  },
];

describe("<CreatePost />", () => {
  const { renderComponent, updateDecorator } = setComponent(
    makeFC(CreatePost),
    {
      decorators: [
        dataDecorator([
          ...mocks(),
          ...guidelineMocks("1"),
          ...teamMemberMocks("1"),
        ]),
      ],
      props: { back: false },
    },
  );

  beforeEach(() => {
    mockLocalstorage("1");
  });

  const setKudoAmount = async (index = 0) => {
    const selectElement = await screen.findByRole("combobox", {
      description: "Kudos amount",
    });
    openSelect(selectElement);
    const options = getSelectOptions(selectElement);
    const kudoAmountOption = options[index];
    kudoAmountOption.click();
  };

  const setReceiver = async (name: string) => {
    const receiverInput = await screen.findByRole("combobox", {
      description: "Receivers",
    });
    openSelect(receiverInput);

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
    renderComponent();

    await pressSubmit();

    const errorMessage = await screen.findByText("Amount can't be empty or 0.");
    expect(errorMessage).toBeInTheDocument();
  });

  it("shows a message if there are no receivers", async () => {
    renderComponent();

    await setKudoAmount();
    await pressSubmit();

    const errorMessage = await screen.findByText(
      "You must select at least one receiver.",
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it("shows a warning if there is no message", async () => {
    renderComponent();

    await setKudoAmount();
    await setReceiver("Egon");
    await pressSubmit();

    const errorMessage = await screen.findByText("Message can't be blank.");
    expect(errorMessage).toBeInTheDocument();
  });

  it("shows a warning if the message is too short", async () => {
    renderComponent();

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
    renderComponent();

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

  it("shows when the mutation is loading", async () => {
    renderComponent();

    await setKudoAmount();
    await setReceiver("Egon");
    await setMessage("Some message");

    await pressSubmit();
    const submitButton = screen.getByRole("button", {
      name: "DROP YOUR KUDOS HERE",
    });
    expect(submitButton).toBeDisabled();
  });

  it("shows when there is an error", async () => {
    updateDecorator("application", (settings) => ({
      mocks: [...mocksWithError, ...settings.mocks],
    }));
    renderComponent();

    await setKudoAmount();
    await setReceiver("Egon");
    await setMessage("Some message");

    await pressSubmit();

    const errorMessage = await screen.findByText("Something went wrong.");
    expect(errorMessage).toBeInTheDocument();
  });
});
