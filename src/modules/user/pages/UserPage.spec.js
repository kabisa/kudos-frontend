import { h } from "preact";
import { shallow } from "enzyme";

import { UserPage } from "./UserPage";

function setup() {
  const props = {
    logout: jest.fn(),

    avatarUrl: "noUrlHere",
    name: "Test user",
    location: "here"
  };

  const enzymeWrapper = shallow(<UserPage {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe("UserPage", () => {
  const { enzymeWrapper } = setup();
  it("should render self and subcomponents", () => {
    expect(enzymeWrapper.exists()).toBe(true);
  });
});
