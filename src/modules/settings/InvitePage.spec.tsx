import { setComponent } from "../../support/testing/testComponent";
import { applicationContext } from "../../support/testing/testContexts";
import { InvitePage } from "./InvitePage";
import { screen } from "@testing-library/react";

describe("<InvitePage />", () => {
  const { setProps, renderComponent } = setComponent(
    InvitePage,
    applicationContext(),
  );
  setProps({});

  it("renders without crashing", async () => {
    renderComponent();

    expect(
      await screen.findByRole("button", { name: "Invite" }),
    ).toBeInTheDocument();
  });
});
