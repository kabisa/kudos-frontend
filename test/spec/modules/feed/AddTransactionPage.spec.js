import { h, render } from "preact";
import { MockedProvider } from "react-apollo/test-utils";

import { AddTransactionPage } from "src/modules/feed";

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
        <AddTransactionPage />
      </MockedProvider>
    );
    expect(scratch.getElementsByClassName("input").length).to.be.eq(1);
  });
});
