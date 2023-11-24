import { mount, ReactWrapper } from "enzyme";
import { act } from "react-dom/test-utils";
import {
  findByTestId,
  mockLocalstorage,
  wait,
  withMockedProviders,
} from "../../spec_helper";
import Statistics, { GET_GOAL_PERCENTAGE } from "./Statistics";

const mocks = [
  {
    request: {
      query: GET_GOAL_PERCENTAGE,
      variables: { team_id: "1" },
    },
    result: {
      data: {
        teamById: {
          activeGoals: [
            {
              id: "1",
              name: "Bowlen",
              amount: 200,
              achievedOn: "2020-03-10",
            },
            {
              id: "2",
              name: "Hapje eten",
              amount: 500,
              achievedOn: "",
            },
          ],
          activeKudosMeter: {
            amount: 250,
          },
        },
      },
    },
  },
];

describe.skip("<Statistics />", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    mockLocalstorage("1");
    wrapper = mount(withMockedProviders(<Statistics />, mocks));
  });

  it("shows a loading state", () => {
    expect(wrapper.containsMatchingElement(<h2>Loading...</h2>));
  });

  it("shows the progress circle", async () => {
    await act(async () => {
      await wait(0);

      wrapper.update();

      expect(wrapper.find(".rc-progress-circle").length).toBe(1);
    });
  });

  it("shows a goal section for all goals", async () => {
    await act(async () => {
      await wait(0);

      wrapper.update();

      const locks = findByTestId(wrapper, "goal-section");

      expect(locks.length).toBe(2);
    });
  });

  it("shows the goal amount", async () => {
    await act(async () => {
      await wait(0);

      wrapper.update();

      const goal = findByTestId(wrapper, "goal-section").first();

      expect(goal.containsMatchingElement(<h3>500 ₭</h3>)).toBe(true);
    });
  });

  it("shows the goal name", async () => {
    await act(async () => {
      await wait(0);

      wrapper.update();

      const goal = findByTestId(wrapper, "goal-section").first();

      expect(goal.containsMatchingElement(<p>[Goal 2] Hapje eten</p>)).toBe(
        true,
      );
    });
  });

  it("shows an unlocked symbol if the goal is achieved", async () => {
    await act(async () => {
      await wait(0);

      wrapper.update();

      const unlockedGoal = findByTestId(wrapper, "goal-section").last();

      expect(
        unlockedGoal.containsMatchingElement(
          <i className="lock open icon lock_icon" />,
        ),
      ).toBe(true);
    });
  });

  it("shows the date if the goal is achieved", async () => {
    await act(async () => {
      await wait(0);

      wrapper.update();

      const unlockedGoal = findByTestId(wrapper, "goal-section").last();

      expect(
        unlockedGoal.containsMatchingElement(
          <span>Achieved on 10 Mar, 2020</span>,
        ),
      ).toBe(true);
    });
  });

  it("shows the progress if the goal is not achieved", async () => {
    await act(async () => {
      await wait(0);

      wrapper.update();

      const lockedGoal = findByTestId(wrapper, "goal-section").first();

      expect(lockedGoal.containsMatchingElement(<span>250 / 500₭</span>)).toBe(
        true,
      );
    });
  });

  it("shows a locked symbol if the goal is not achieved", async () => {
    await act(async () => {
      await wait(0);

      wrapper.update();

      const lockedGoal = findByTestId(wrapper, "goal-section").first();

      expect(
        lockedGoal.containsMatchingElement(
          <i className="lock icon lock_icon" />,
        ),
      ).toBe(true);
    });
  });

  it("fills the progress bar completely if the goal is achieved", async () => {
    await act(async () => {
      await wait(0);

      wrapper.update();

      const achievedProgressBar = findByTestId(wrapper, "progress-bar").last();

      expect(achievedProgressBar.props().style?.backgroundColor).toBe(
        "#3899b7",
      );
      expect(achievedProgressBar.props().className).toEqual("bar");
    });
  });

  it("fills the progress bar to the correct percentage if the goal is not achieved", async () => {
    await act(async () => {
      await wait(0);

      wrapper.update();

      const partialProgressBar = findByTestId(wrapper, "next-progress-bar");

      expect(partialProgressBar.props().style?.backgroundColor).toBe("#3899b7");
      expect(partialProgressBar.props().style?.height).toBe("17px");
      expect(partialProgressBar.props().style?.marginTop).toBe("88px");
    });
  });
});
