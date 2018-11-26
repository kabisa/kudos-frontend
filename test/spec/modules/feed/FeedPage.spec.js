import { h, render } from "preact";
import { MockedProvider } from "react-apollo/test-utils";
import wait from "waait";

import { FeedPage } from "src/modules/feed";
import { GET_TRANSACTIONS } from "src/modules/feed/queries";

const mocks = [
  {
    request: {
      query: GET_TRANSACTIONS,
      variables: { team_id: 1 },
    },
    result: {
      data: {
        postsConnection: {
          edges: [
            {
              cursor: "x",
              node: {
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
                votes: [
                  {
                    voter: {
                      id: "5",
                      name: "VoteBoi",
                    },
                  },
                ],
              },
            },
          ],
          pageInfo: {
            endCursor: "x",
            hasNextPage: false,
          },
        },
      },
    },
  },
];

describe("FeedPage", function() {
  let scratch, mount;

  beforeEach(function() {
    scratch = document.createElement("div");
    mount = jsx => render(jsx, scratch);
  });

  afterEach(function() {
    scratch.innerHtml = "";
  });

  it("renders the placeholders", function() {
    mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <FeedPage />
      </MockedProvider>
    );
    expect(scratch.getElementsByClassName("placeholder").length).to.be.equals(
      8
    );
  });

  it("renders posts", async function() {
    mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <FeedPage />
      </MockedProvider>
    );

    await wait(0);

    expect(scratch.getElementsByClassName("kudo-progress")[0]).to.be.visible;
  });
});
