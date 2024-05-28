import { withMockedProviders } from "../../spec_helper";
import { InvitePage } from "./InvitePage";
import { render, screen } from "@testing-library/react";

describe("<InvitePage />", () => {
  beforeEach(() => {
    render(withMockedProviders(<InvitePage />));
  });

  it("renders without crashing", async () => {
    expect(
      await screen.findByRole("button", { name: "Invite" }),
    ).toBeInTheDocument();
  });
});
