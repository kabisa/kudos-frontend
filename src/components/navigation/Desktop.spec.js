import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";

import { DesktopNavigation as Desktop } from "./Desktop";

function setup() {
  const props = {
    logout: jest.fn(),
    name: "Test user"
  };

  const enzymeWrapper = mount(
    <MemoryRouter>
      <Desktop {...props} />
    </MemoryRouter>
  );

  return {
    props,
    enzymeWrapper
  };
}

describe("Desktop", () => {
  const { enzymeWrapper } = setup();
  it("should render self and subcomponents", () => {
    expect(enzymeWrapper.exists()).toBe(true);
  });
});
