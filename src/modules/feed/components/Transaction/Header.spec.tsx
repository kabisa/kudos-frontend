import {
  MockedFunction,
  mockLocalstorage,
  withMockedProviders,
} from "../../../../spec_helper";
import { Header, MUTATION_REMOVE_POST } from "./Header";
import { FragmentPostResult, GET_POSTS } from "../../queries";
import { screen, render, waitFor } from "@testing-library/react";

const transaction: FragmentPostResult = {
  amount: 5,
  createdAt: new Date().toString(),
  id: "1",
  message: "For cleaning up his desk",
  receivers: [
    {
      id: "2",
      name: "Egon",
      avatar: "receiverAvatarUrl",
    },
  ],
  sender: {
    id: "1",
    name: "Max",
    avatar: "fakeAvatarUrl",
  },
  votes: [],
};

const olderTransaction: FragmentPostResult = {
  amount: 5,
  createdAt: "2020-03-01",
  id: "1",
  message: "For cleaning up his desk",
  receivers: [
    {
      id: "2",
      name: "Egon",
      avatar: "receiverAvatarUrl",
    },
  ],
  sender: {
    id: "1",
    name: "Max",
    avatar: "fakeAvatarUrl",
  },
  votes: [],
};

let mutationCalled = false;
let queryCalled = false;
const mocks = [
  {
    request: {
      query: MUTATION_REMOVE_POST,
      variables: { id: "1" },
    },
    result: () => {
      mutationCalled = true;
      return {
        data: {
          deletePost: {
            postId: "1",
          },
        },
      };
    },
  },
  {
    request: {
      query: GET_POSTS,
      variables: { team_id: "1" },
    },
    result: () => {
      queryCalled = true;
      return {
        data: {
          teamById: {
            posts: [],
          },
        },
      };
    },
  },
];

describe("<Header />", () => {
  beforeEach(() => {
    mockLocalstorage("1");
    mutationCalled = false;
    queryCalled = false;
  });

  it("shows the correct kudo amount", async () => {
    render(withMockedProviders(<Header transaction={transaction} />, mocks));
    const amount = await screen.findByTestId("post-amount");
    expect(amount.textContent).toBe("5");
  });

  // This functionality is disabled in the code
  it.skip("shows the correct timestamp", async () => {
    render(withMockedProviders(<Header transaction={transaction} />, mocks));
    const timestamp = await screen.findByTestId("post-timestamp");
    expect(timestamp.textContent).toContain("a few seconds ago");
  });

  it("shows the senders avatar", async () => {
    render(withMockedProviders(<Header transaction={transaction} />, mocks));
    const senderAvatar = await screen.findByTestId("sender-avatar");
    expect(senderAvatar.getAttribute("src")).toBe("fakeAvatarUrl");
  });

  it("shows the receivers avatar", async () => {
    render(withMockedProviders(<Header transaction={transaction} />, mocks));
    const receiverAvatar = await screen.findByTestId("receiver-avatar");
    expect(receiverAvatar.getAttribute("src")).toBe("receiverAvatarUrl");
  });

  it("allows the user to remove his own post within 15 minutes", () => {
    render(withMockedProviders(<Header transaction={transaction} />, mocks));
    const deleteButton = screen.queryByTestId("delete-button");
    expect(deleteButton).not.toBeNull();
  });

  // deletion is always allowed now...
  it.skip("prevents the user to remove his own post after 15 minutes", () => {
    render(
      withMockedProviders(<Header transaction={olderTransaction} />, mocks),
    );

    const deleteButton = screen.queryByTestId("delete-button");
    expect(deleteButton).toBeNull();
  });

  it("always allows an admin to remove a post", () => {
    mockLocalstorage("admin");
    render(withMockedProviders(<Header transaction={transaction} />, mocks));

    const deleteButton = screen.queryAllByTestId("delete-button");
    expect(deleteButton).not.toBeNull();
  });

  it("does not allow an other user to delete the post", () => {
    mockLocalstorage("3");
    render(withMockedProviders(<Header transaction={transaction} />, mocks));

    const deleteButton = screen.queryByTestId("delete-button");
    expect(deleteButton).toBeNull();
  });

  describe("when deleting a post", () => {
    beforeEach(() => {
      global.confirm = jest.fn(() => true);
      render(withMockedProviders(<Header transaction={transaction} />, mocks));
    });

    it("shows a confirmation dialog ", () => {
      const deleteButton = screen.getByTestId("delete-button");
      deleteButton.click();
      expect(global.confirm).toBeCalled();
    });

    it("calls the delete mutation and refetch query", () => {
      const deleteButton = screen.getByTestId("delete-button");
      queryCalled = false;
      deleteButton.click();
      waitFor(() => {
        expect(mutationCalled).toBe(true);
      });
      waitFor(() => {
        expect(queryCalled).toBe(true);
      });
    });

    it("does not call the delete mutation when confirm is canceled", () => {
      const deleteButton = screen.getByTestId("delete-button");
      queryCalled = false;
      (global.confirm as MockedFunction<Window["confirm"]>).mockReturnValueOnce(
        false,
      );

      deleteButton.click();
      waitFor(() => {
        expect(mutationCalled).not.toBe(true);
      });
    });
  });
});
