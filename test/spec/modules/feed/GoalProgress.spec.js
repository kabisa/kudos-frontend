import { h, render } from "preact";
import { MockedProvider } from "react-apollo/test-utils";
import wait from "waait";

import GoalProgress from "src/modules/feed/components/GoalProgress/GoalProgress";
import { GET_GOAL_PERCENTAGE } from "src/modules/feed/queries";

const mocks = [
  {
    request: {
      query: GET_GOAL_PERCENTAGE,
      variables: { team_id: 1 },
    },
    result: {
      data: {
        teamById: {
          activeKudosMeter: {
            amount: 5,
          },
          activeGoals: [
            {
              id: 1,
              amount: 10,
              name: "Goal 1",
            },
          ],
        },
      },
    },
  },
];

describe("GoalProgress", function() {
  let scratch, mount;

  beforeEach(function() {
    scratch = document.createElement("div");
    mount = jsx => render(jsx, scratch);
  });

  afterEach(function() {
    scratch.innerHtml = "";
  });

  it("renders the loading bar", function() {
    mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <GoalProgress />
      </MockedProvider>
    );
    expect(scratch.getElementsByClassName("kudo-progress")[0]).to.be.visible;
  });

  it("renders progressbar", async function() {
    mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <GoalProgress />
      </MockedProvider>
    );

    await wait(0);

    expect(scratch.getElementsByClassName("kudo-progress")[0]).to.be.visible;
  });
});
