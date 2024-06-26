import { mockLocalstorage } from "../../spec_helper";
import { setTestSubject } from "../../support/testing/testSubject";
import {
  dataDecorator,
  routingDecorator,
} from "../../support/testing/testDecorators";
import { SettingsPage } from "./index";
import { screen } from "@testing-library/react";

describe("<SettingsPage />", () => {
  const { renderComponent } = setTestSubject(SettingsPage, {
    decorators: [dataDecorator(), routingDecorator()],
    props: {},
  });

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
