import { Transaction } from "./index";
import { FragmentPostResult } from "../../queries";
import { screen } from "@testing-library/react";
import { setComponent } from "../../../../support/testing/testComponent";
import { applicationContext } from "../../../../support/testing/testContexts";

const transaction: FragmentPostResult = {
  id: "1",
  amount: 5,
  message: "test message",
  createdAt: "",
  images: [],
  receivers: [
    {
      name: "Stefan",
      id: "1",
      avatar: "fakeUrl",
    },
  ],
  sender: {
    name: "Egon",
    id: "2",
    avatar: "fakeUrl",
  },
  votes: [],
};

const transactionWithVote = {
  ...transaction,
  votes: [
    {
      voter: {
        id: "5",
        name: "Ralph",
      },
    },
  ],
};

describe("Transaction", () => {
  const { setProps, renderComponent } = setComponent(
    Transaction,
    applicationContext(),
  );
  setProps({ transaction: transactionWithVote });

  beforeEach(() => {
    renderComponent();
  });

  it("renders the kudos amount without votes", () => {
    const postMessage = screen.getByTestId("kudo-amount");

    expect(postMessage.textContent).toBe("5₭ ");
  });

  it("renders the message", () => {
    const postMessage = screen.getByTestId("post-message");

    expect(postMessage.textContent).toBe("test message");
  });

  it("renders the like button", () => {
    const voteButton = screen.getByTestId("post-like-button");

    expect(voteButton).toBeInTheDocument();
  });

  it("renders the senders name", () => {
    const senderName = screen.getByTestId("sender-name");

    expect(senderName.textContent).toBe("Egon ");
  });

  it("renders all the receivers", () => {
    const receivers = screen.getByTestId("post-receivers");

    expect(receivers.textContent).toBe("Stefan");
  });

  it("renders the header", () => {
    const header = screen.getByTestId("post-header");

    expect(header).toBeInTheDocument();
  });
});
