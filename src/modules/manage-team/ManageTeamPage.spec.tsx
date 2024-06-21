import { createMemoryHistory, MemoryHistory } from "history";
import { ManageTeamPage } from "./ManageTeamPage";
import { screen } from "@testing-library/react";
import { makeFC, setComponent } from "../../support/testing/testComponent";
import { routingDecorator } from "../../support/testing/testDecorators";
import { createRouterProps } from "../../spec_helper";

describe("<ManageTeamPage/>", () => {
  let history: MemoryHistory;

  const { setProps, renderComponent } = setComponent(makeFC(ManageTeamPage), {
    decorators: [routingDecorator()],
  });

  beforeEach(() => {
    history = createMemoryHistory();
    setProps({
      ...createRouterProps(),
      history,
    });

    renderComponent();
  });

  it("navigates to the general section", () => {
    const link = screen.getByTestId("general-button");
    link.click();

    expect(history.location.pathname).toBe("/general");
  });

  it("navigates to the invites section", () => {
    const link = screen.getByTestId("invites-button");
    link.click();

    expect(history.location.pathname).toBe("/invites");
  });

  it("navigates to the guidelines section", () => {
    const link = screen.getByTestId("guidelines-button");
    link.click();
    expect(history.location.pathname).toBe("/guidelines");
  });

  it("navigates to the members section", () => {
    const link = screen.getByTestId("members-button");
    link.click();
    expect(history.location.pathname).toBe("/members");
  });

  it("navigates to the kudometer section", () => {
    const link = screen.getByTestId("kudometers-button");
    link.click();

    expect(history.location.pathname).toBe("/kudometers");
  });

  it("navigates to the integrations section", () => {
    const link = screen.getByTestId("integrations-button");
    link.click();
    expect(history.location.pathname).toBe("/integrations");
  });
});
