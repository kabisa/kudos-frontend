import { setTestSubject } from "../../support/testing/testSubject";
import { dataDecorator } from "../../support/testing/testDecorators";
import { InvitePage } from "./InvitePage";
import { screen } from "@testing-library/react";

describe("<InvitePage />", () => {
  const { renderComponent } = setTestSubject(InvitePage, {
    decorators: [dataDecorator()],
    props: {},
  });

  it("renders without crashing", async () => {
    renderComponent();

    expect(
      await screen.findByRole("button", { name: "Invite" }),
    ).toBeInTheDocument();
  });
});
