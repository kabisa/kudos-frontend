import { h, render } from "preact";
import { MockedProvider } from "react-apollo/test-utils";

import { UserDropdown } from "src/modules/feed/components";
import { GET_USERS } from "src/modules/feed/queries";

const mocks = [
  {
    request: {
      query: GET_USERS,
    },
    result: {
      data: {
        users: [{ id: "1", name: "Stefan" }],
      },
    },
  },
];

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
      <MockedProvider mocks={mocks}>
        <UserDropdown />
      </MockedProvider>
    );
    const input = scratch.getElementsByTagName("input")[0];
    console.log(input);
    input.value = "St";
    console.log(scratch);
    expect(scratch.getElementsByTagName("input").length).to.be.eq(1);
  });
});
