import { withMockedProviders } from "../spec_helper";
import AuthenticatedRoute from "./AuthenticatedRoute";
import { Auth } from "../support";
import { render, screen } from "@testing-library/react";

jest.mock("../support/auth");

const fakeComponent = () => <h1>Fake component</h1>;

const setup = (allowNoTeam: boolean) => {
  render(
    withMockedProviders(
      <AuthenticatedRoute
        allowNoTeam={allowNoTeam}
        component={fakeComponent}
      />,
    ),
  );
};

describe("<AuthenticatedRoute />", () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it("does not render the page if the user is not logged in", () => {
    Auth.isLoggedIn = jest.fn(() => false);
    setup(false);

    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  it("does not render the page if the user has no team and allowNoTeam is false", () => {
    Auth.isLoggedIn = jest.fn(() => true);
    Auth.hasTeam = jest.fn(() => false);
    setup(false);

    expect(screen.getByText("Choose team Page")).toBeInTheDocument();
  });

  it("does render the page if the user has no team and allowNoTeam is true", () => {
    Auth.isLoggedIn = jest.fn(() => true);
    Auth.hasTeam = jest.fn(() => false);
    setup(true);
    expect(screen.getByText("Fake component")).toBeInTheDocument();
  });

  it("does render the page if the user is logged in and has a team", () => {
    Auth.isLoggedIn = jest.fn(() => true);
    Auth.hasTeam = jest.fn(() => true);
    setup(false);

    expect(screen.getByText("Fake component")).toBeInTheDocument();
  });
});
