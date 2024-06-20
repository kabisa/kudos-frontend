import { mockLocalstorage } from "../../spec_helper";
import { setComponent } from "../../support/testing/testComponent";
import {
  applicationContext,
  routingContext,
} from "../../support/testing/testContexts";
import { SettingsPage } from "./index";
import { screen } from "@testing-library/react";

describe("<SettingsPage />", () => {
  const { setProps, renderComponent } = setComponent(
    SettingsPage,
    applicationContext(),
    routingContext(),
  );
  setProps({});

  it("shows the invite button if the user is an admin", () => {
    mockLocalstorage("admin");
    renderComponent();

    const inviteButton = screen.queryByRole("button", {
      name: "Invite",
    });
    expect(inviteButton).toBeInTheDocument();
  });

  it("hides the invite button if the user is a member", () => {
    mockLocalstorage("member");
    renderComponent();

    const inviteButton = screen.queryByRole("button", {
      name: "Invite",
    });
    expect(inviteButton).toBeNull();
  });
});
