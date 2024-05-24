import { act } from "react-dom/test-utils";
import { createMemoryHistory, MemoryHistory } from "history";
import { withMockedProviders } from "../../spec_helper";
import { ManageTeamPage } from "./ManageTeamPage";
import { render, RenderResult, screen } from "@testing-library/react";

describe("<ManageTeamPage/>", () => {
  let history: MemoryHistory;

  beforeEach(async () => {
    history = createMemoryHistory();

    await act(async () => {
      render(withMockedProviders(<ManageTeamPage history={history} />));
    });
  });

  it("navigates to the general section", async () => {
    const link = screen.getByTestId("general-button");
    link.click();

    expect(history.location.pathname).toBe("/general");
  });

  it("navigates to the invites section", async () => {
    const link = screen.getByTestId("invites-button");
    link.click();

    expect(history.location.pathname).toBe("/invites");
  });

  it("navigates to the guidelines section", async () => {
    const link = screen.getByTestId("guidelines-button");
    link.click();
    expect(history.location.pathname).toBe("/guidelines");
  });

  it("navigates to the members section", async () => {
    const link = screen.getByTestId("members-button");
    link.click();
    expect(history.location.pathname).toBe("/members");
  });

  it("navigates to the kudometer section", async () => {
    const link = screen.getByTestId("kudometers-button");
    link.click();

    expect(history.location.pathname).toBe("/kudometers");
  });

  it("navigates to the integrations section", async () => {
    const link = screen.getByTestId("integrations-button");
    link.click();
    expect(history.location.pathname).toBe("/integrations");
  });
});
