import { mount, ReactWrapper } from "enzyme";
import { Invite, InviteModel } from "./Invite";
import { withMockedProviders } from "../../../spec_helper";

const invite: InviteModel = {
  id: "1",
  team: {
    id: "2",
    name: "Kabisa",
  },
};

describe.skip("<Invite />", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(withMockedProviders(<Invite invite={invite} />));
  });

  it("renders the team name", () => {
    expect(wrapper.containsMatchingElement(<p>Kabisa</p>)).toBe(true);
  });

  it("renders an accept button", () => {
    expect(wrapper.containsMatchingElement(<button>Accept</button>)).toBe(true);
  });

  it("renders an decline button", () => {
    expect(wrapper.containsMatchingElement(<button>Decline</button>)).toBe(
      true,
    );
  });
});
