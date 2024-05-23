import { mockLocalstorage, withMockedProviders } from "../../spec_helper";
import { SettingsPage } from "./index";
import { render, screen } from "@testing-library/react";

const setup = () => {
  render(withMockedProviders(<SettingsPage />));
};

describe("<SettingsPage />", () => {
  it("shows the invite button if the user is an admin", async () => {
    mockLocalstorage("admin");
    setup();

    const inviteButton = screen.queryByRole("button", {
      name: "Invite",
    });
    expect(inviteButton).toBeInTheDocument();
  });

  it("hides the invite button if the user is a member", async () => {
    mockLocalstorage("member");
    setup();

    const inviteButton = screen.queryByRole("button", {
      name: "Invite",
    });
    expect(inviteButton).toBeNull();
  });
});
