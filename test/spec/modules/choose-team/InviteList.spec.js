import { h, render } from "preact";
import { MockedProvider } from "react-apollo/test-utils";
import wait from "waait";
import * as d from "dom-testing-library";

import InviteList, {
  GET_INVITES,
} from "src/modules/choose-team/components/InviteList";

const mocks = [
  {
    request: {
      query: GET_INVITES,
    },
    result: {
      data: {
        viewer: {
          self: {
            teamInvites: [
              {
                id: "1",
                team: {
                  name: "Team 1",
                },
              },
              {
                id: "2",
                team: {
                  name: "Team 2",
                },
              },
            ],
          },
        },
      },
    },
  },
];

describe("InviteList", function() {
  let scratch, mount;

  beforeEach(function() {
    scratch = document.createElement("div");
    mount = jsx => render(jsx, scratch);
  });

  afterEach(function() {
    scratch.innerHtml = "";
  });

  it("renders the loading text", function() {
    mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <InviteList />
      </MockedProvider>
    );
    expect(d.getByText(scratch, "Loading...")).to.be.visible;
  });

  it("renders the team list", async function() {
    mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <InviteList />
      </MockedProvider>
    );

    await wait(0);

    expect(d.queryAllByText(scratch, "Accept"))
      .to.be.an("array")
      .to.have.lengthOf(2);

    expect(d.queryAllByText(scratch, "Decline"))
      .to.be.an("array")
      .to.have.lengthOf(2);
  });
});
