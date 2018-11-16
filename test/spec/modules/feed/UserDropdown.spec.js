import { h, render } from "preact";
import { MockedProvider } from "react-apollo/test-utils";

import { UserDropdown } from "src/modules/feed/components";

describe("AddTransactionPage ", function() {
  let scratch, mount;

  beforeEach(function() {
    scratch = document.createElement("div");
    mount = jsx => render(jsx, scratch);
  });

  afterEach(function() {
    scratch.innerHtml = "";
  });

  it("has one input elements", function() {
    mount(
      <MockedProvider>
        <UserDropdown />
      </MockedProvider>
    );
    const input = scratch.getElementsByTagName("input");
    expect(input.length).to.be.eq(1);
  });
});
