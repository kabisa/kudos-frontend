import { h, render } from "preact";
import { MockedProvider } from "react-apollo/test-utils";
import * as d from "dom-testing-library";

import { Transaction } from "src/modules/feed/components";

const transaction = {
  id: "1",
  amount: 5,
  message: "test message",
  receivers: [
    {
      name: "Stefan",
    },
  ],
  sender: {
    name: "Admin",
  },
  votes: [],
};

const transactionWithVote = {
  ...transaction,
  votes: [
    {
      voter: {
        id: "5",
        name: "VoteBoi",
      },
    },
  ],
};

describe("Transaction", () => {
  let scratch, mount;

  function mountPost(mount) {
    mount(
      <MockedProvider>
        <Transaction transaction={transaction} />
      </MockedProvider>
    );
  }

  function mountPostWithVotes(mount) {
    mount(
      <MockedProvider>
        <Transaction transaction={transactionWithVote} />
      </MockedProvider>
    );
  }

  beforeEach(() => {
    scratch = document.createElement("div");
    mount = jsx => render(jsx, scratch);
  });

  afterEach(() => {
    scratch.innerHtml = "";
  });

  it("renders the kudos amount without votes", () => {
    mountPost(mount);
    expect(d.getByTestId(scratch, "post-amount").innerHTML).to.be.equals("5 ₭");
  });

  it("renders the kudos amount with votes", () => {
    mountPostWithVotes(mount);
    expect(d.getByTestId(scratch, "post-amount").innerHTML).to.be.equals("6 ₭");
  });

  it("renders the timestamp", () => {
    mountPostWithVotes(mount);
    expect(d.getByTestId(scratch, "post-timestamp").innerHTML).to.be.equals(
      "1s ago"
    );
  });

  it("renders the message", () => {
    mountPostWithVotes(mount);
    expect(d.getByTestId(scratch, "post-message").innerHTML).to.be.equals(
      "<strong>Admin</strong> gave <strong>5₭ </strong>to <strong>Stefan</strong> for test message"
    );
  });

  it("renders the vote button", () => {
    mountPostWithVotes(mount);
    expect(d.getByTestId(scratch, "post-like-button")).to.be.visible;
  });

  it("renders the voters message", () => {
    mountPostWithVotes(mount);
    expect(
      d.getByTestId(scratch, "post-voters-message").innerHTML
    ).to.be.equals("+1₭ by VoteBoi");
  });

  it("renders no voters message", () => {
    mountPost(mount);
    expect(
      d.getByTestId(scratch, "post-voters-message").innerHTML
    ).to.be.equals("");
  });
});
