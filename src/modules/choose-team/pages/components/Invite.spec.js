import { h } from "preact";
import { mount } from "enzyme";

import { Invite } from "./Invite";

function setup() {
  const props = {};

  const enzymeWrapper = mount(<Invite {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe("Invite", () => {
  const { enzymeWrapper } = setup();

  it("should render self and subcomponents", () => {
    expect(enzymeWrapper.exists()).toBe(true);
  });
});
