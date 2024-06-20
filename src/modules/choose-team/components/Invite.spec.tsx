import { Invite, InviteModel } from "./Invite";
import { screen } from "@testing-library/react";
import { setComponent } from "../../../support/testing/testComponent";
import { dataDecorator } from "../../../support/testing/testDecorators";

const invite: InviteModel = {
  id: "1",
  team: {
    id: "2",
    name: "Kabisa",
  },
};

describe("<Invite />", () => {
  const { renderComponent } = setComponent(Invite, {
    decorators: [dataDecorator()],
    props: { invite },
  });

  it("renders the team name", async () => {
    renderComponent();

    const element = await screen.findByText("Kabisa");
    expect(element).toBeInTheDocument();
  });

  it("renders an accept button", async () => {
    renderComponent();

    const element = await screen.findByRole("button", { name: "Accept" });
    expect(element).toBeInTheDocument();
  });

  it("renders an decline button", async () => {
    renderComponent();

    const element = await screen.findByRole("button", { name: "Decline" });
    expect(element).toBeInTheDocument();
  });
});
