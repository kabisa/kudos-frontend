import { h } from "preact";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";

import { GoalProgress } from "./GoalProgress";

function setup() {
  const props = {
    getGoalProgress: jest.fn(() => 50),
    goalPercentageSuccess: true,
  };

  const enzymeWrapper = mount(
    <MemoryRouter>
      <GoalProgress {...props} />
    </MemoryRouter>
  );

  return {
    props,
    enzymeWrapper,
  };
}

describe("GoalProgress", () => {
  const { enzymeWrapper } = setup();

  it("should render self and subcomponents", () => {
    expect(enzymeWrapper.find("a").hasClass("kudo-progress")).toBe(true);
  });

  it("should have a positive progress bar", () => {
    expect(
      enzymeWrapper
        .find("a")
        .find("div")
        .first()
        .hasClass("kudo-progress-bar")
    ).toBe(true);
  });

  it("should have a negative progress bar", () => {
    expect(
      enzymeWrapper
        .find("a")
        .find("div")
        .last()
        .hasClass("kudo-progress-bar-negative")
    ).toBe(true);
  });
});
