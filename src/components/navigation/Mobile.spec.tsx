import { mockLocalstorage } from "../../spec_helper";
import Mobile from "./Mobile";
import { Auth } from "../../support";
import { screen } from "@testing-library/react";
import { setComponent } from "../../support/testing/testComponent";
import { routingDecorator } from "../../support/testing/testDecorators";

describe("<Mobile />", () => {
  mockLocalstorage("fakeToken");

  const { renderComponent } = setComponent(Mobile, {
    decorators: [routingDecorator()],
    props: {},
  });

  beforeEach(() => {
    renderComponent();
  });

  it("has a button to the settings page", () => {
    expect(screen.getByRole("link", { name: "settings" })).toBeInTheDocument();
  });

  it("has a button to the profile page", () => {
    expect(screen.getByRole("link", { name: "person" })).toBeInTheDocument();
  });

  it("has a button to the feed page if the user is logged in", () => {
    expect(screen.getByRole("link", { name: "home" })).toBeInTheDocument();
  });

  it("has a button to the statistics page if the user is logged in", () => {
    expect(
      screen.getByRole("link", { name: "monitoring" }),
    ).toBeInTheDocument();
  });

  it("has a button to the notifications page if the user is logged in", () => {
    expect(
      screen.getByRole("link", { name: "notifications" }),
    ).toBeInTheDocument();
  });

  it("has no buttons to the feed, statistics and notifications page if the user has no team", () => {
    Auth.hasTeam = jest.fn(() => false);
    renderComponent();

    expect(screen.queryByRole("link", { name: "monitoring" })).toBeNull();
    expect(screen.queryByRole("link", { name: "notifications" })).toBeNull();
    expect(screen.queryByRole("link", { name: "home" })).toBeNull();
  });
});
