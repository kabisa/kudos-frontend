import { mount, ReactWrapper } from "enzyme";
import { act } from "react-dom/test-utils";
import { mockLocalstorage, withMockedProviders } from "../../spec_helper";
import { SettingsPage } from "./index";

let wrapper: ReactWrapper;
const setup = () => {
  wrapper = mount(withMockedProviders(<SettingsPage />));
};

describe.skip("<SettingsPage />", () => {
  it("shows the invite button if the user is an admin", async () => {
    mockLocalstorage("admin");
    await act(async () => {
      setup();
    });
    expect(wrapper.containsMatchingElement(<button>Invite</button>)).toBe(true);
  });

  it("hides the invite button if the user is an admin", async () => {
    mockLocalstorage("member");
    await act(async () => {
      setup();
    });
    expect(wrapper.containsMatchingElement(<button>Invite</button>)).toBe(
      false,
    );
  });
});
