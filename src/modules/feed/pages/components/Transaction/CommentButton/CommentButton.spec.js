import { h } from "preact";
import { mount } from "enzyme";

import CommentButton from "./CommentButton";

function setup() {
  const props = {
    text: 23
  };

  const enzymeWrapper = mount(<CommentButton {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe("CommentButton", () => {
  const { enzymeWrapper } = setup();
  it("should render self and subcomponents", () => {
    expect(enzymeWrapper.find("button").hasClass("button-action")).toBe(true);
  });

  it("should have a button text", () => {
    expect(enzymeWrapper.find("button").text()).toBe("23");
  });

  it("should have an icon", () => {
    expect(
      enzymeWrapper
        .find("button")
        .find("i")
        .hasClass("comment outline")
    ).toBe(true);
  });
});
