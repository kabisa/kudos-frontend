import { mount, ReactWrapper } from "enzyme";
import { findByTestId, withMockedProviders } from "../spec_helper";
import AuthenticatedRoute from "./AuthenticatedRoute";
import { Auth } from "../support";

jest.mock("../support/auth");

const fakeComponent = () => <h1>Fake component</h1>;

let wrapper: ReactWrapper;
const setup = (allowNoTeam: boolean) => {
  wrapper = mount(
    withMockedProviders(
      <AuthenticatedRoute
        allowNoTeam={allowNoTeam}
        component={fakeComponent}
      />,
    ),
  );
};
describe.skip("<AuthenticatedRoute />", () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it("does not render the page if the user is not logged in", () => {
    Auth.isLoggedIn = jest.fn(() => false);
    setup(false);

    expect(findByTestId(wrapper, "redirect").length).toBe(1);
  });

  it("does not render the page if the user has no team and allowNoTeam is false", () => {
    Auth.isLoggedIn = jest.fn(() => true);
    Auth.hasTeam = jest.fn(() => false);
    setup(false);

    expect(findByTestId(wrapper, "redirect").length).toBe(1);
  });

  it("does render the page if the user has no team and allowNoTeam is true", () => {
    Auth.isLoggedIn = jest.fn(() => true);
    Auth.hasTeam = jest.fn(() => false);
    setup(true);

    expect(findByTestId(wrapper, "component").length).toBe(1);
  });

  it("does render the page if the user is logged in and has a team", () => {
    Auth.isLoggedIn = jest.fn(() => true);
    Auth.hasTeam = jest.fn(() => true);
    setup(false);

    expect(findByTestId(wrapper, "component").length).toBe(1);
  });
});
