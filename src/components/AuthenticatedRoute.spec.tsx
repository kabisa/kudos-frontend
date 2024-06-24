import AuthenticatedRoute from "./AuthenticatedRoute";
import { Auth } from "../support";
import { screen } from "@testing-library/react";
import { setTestSubject } from "../support/testing/testSubject";
import { PATH_CHOOSE_TEAM, PATH_LOGIN } from "../routes";
import { routingDecorator } from "../support/testing/testDecorators";

jest.mock("../support/auth");

describe("<AuthenticatedRoute />", () => {
  const { renderComponent, updateDecorator, updateProps } = setTestSubject(
    AuthenticatedRoute,
    {
      decorators: [routingDecorator()],
      props: {
        allowNoTeam: false,
        component: () => <h1>Fake component</h1>,
      },
    },
  );

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  beforeEach(() => {
    updateDecorator("routing", {
      paths: {
        [PATH_LOGIN]: "Login Page",
        [PATH_CHOOSE_TEAM]: "Choose team Page",
      },
    });
  });

  it("does not render the page if the user is not logged in", () => {
    Auth.isLoggedIn = jest.fn(() => false);
    renderComponent();

    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  it("does not render the page if the user has no team and allowNoTeam is false", () => {
    Auth.isLoggedIn = jest.fn(() => true);
    Auth.hasTeam = jest.fn(() => false);
    renderComponent();

    expect(screen.getByText("Choose team Page")).toBeInTheDocument();
  });

  it("does render the page if the user has no team and allowNoTeam is true", () => {
    Auth.isLoggedIn = jest.fn(() => true);
    Auth.hasTeam = jest.fn(() => false);
    updateProps({ allowNoTeam: true });
    renderComponent();

    expect(screen.getByText("Fake component")).toBeInTheDocument();
  });

  it("does render the page if the user is logged in and has a team", () => {
    Auth.isLoggedIn = jest.fn(() => true);
    Auth.hasTeam = jest.fn(() => true);
    renderComponent();

    expect(screen.getByText("Fake component")).toBeInTheDocument();
  });
});
