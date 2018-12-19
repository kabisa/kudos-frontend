import { h, render } from "preact";
import { MockedProvider } from "react-apollo/test-utils";
import wait from "waait";
import * as d from "dom-testing-library";

import TeamList, {
  GET_TEAMS,
} from "src/modules/choose-team/components/TeamList";

const mocks = [
  {
    request: {
      query: GET_TEAMS,
    },
    result: {
      data: {
        viewer: {
          self: {
            memberships: [
              {
                id: "1",
                role: "admin",
                team: {
                  id: "2",
                  name: "Team 1",
                },
              },
              {
                id: "2",
                role: "admin",
                team: {
                  id: "2",
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

describe("TeamList", function() {
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
        <TeamList />
      </MockedProvider>
    );
    expect(d.getByText(scratch, "Loading...")).to.be.visible;
  });

  it("renders the team list", async function() {
    mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TeamList />
      </MockedProvider>
    );

    await wait(0);

    expect(d.queryAllByText(scratch, "Choose"))
      .to.be.an("array")
      .to.have.lengthOf(2);
  });
});
