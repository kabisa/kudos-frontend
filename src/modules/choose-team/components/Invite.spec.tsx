import { Invite, InviteModel } from "./Invite";
import { withMockedProviders } from "../../../spec_helper";
import { render, screen } from "@testing-library/react";

const invite: InviteModel = {
  id: "1",
  team: {
    id: "2",
    name: "Kabisa",
  },
};

describe("<Invite />", () => {
  beforeEach(() => {
    render(withMockedProviders(<Invite invite={invite} />));
  });

  it("renders the team name", async () => {
    const element = await screen.findByText("Kabisa");
    expect(element).toBeInTheDocument();
  });

  it("renders an accept button", async () => {
    const element = await screen.findByRole("button", { name: "Accept" });
    expect(element).toBeInTheDocument();
  });

  it("renders an decline button", async () => {
    const element = await screen.findByRole("button", { name: "Decline" });
    expect(element).toBeInTheDocument();
  });
});
