import { h, render } from "preact";
import { MockedProvider } from "react-apollo/test-utils";
import wait from "waait";

import TeamList from "src/modules/choose-team/TeamList";
import { GET_TEAMS } from "src/modules/choose-team/queries";

const mocks = [
  {
    request: {
      query: GET_TEAMS,
    },
    result: {
      data: {
        teams: [
          {
            id: "1",
            name: "Team 1",
          },
        ],
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
      <MockedProvider>
        <TeamList mocks={mocks} addTypename={false} />
      </MockedProvider>
    );
    expect(scratch.querySelector("p").textContent).to.be.eq("Loading...");
  });

  it("renders the team list", async function() {
    mount(
      <MockedProvider>
        <TeamList mocks={mocks} addTypename={false} />
      </MockedProvider>
    );

    await wait(0);

    console.warn(scratch);

    expect(scratch.querySelector("p").textContent).to.be.eq("Team 1");
  });
});
