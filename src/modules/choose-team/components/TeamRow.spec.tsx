import { createMemoryHistory, MemoryHistory } from "history";
import TeamRow from "./TeamRow";
import { Storage } from "../../../support/storage";
import { screen } from "@testing-library/react";
import { setComponent } from "../../../support/testing/testComponent";
import { routingContext } from "../../../support/testing/testContexts";

describe("<TeamRow />", () => {
  let history: MemoryHistory;
  const { setProps, renderComponent } = setComponent(TeamRow, routingContext());

  beforeEach(() => {
    history = createMemoryHistory();
    Storage.setItem = jest.fn();

    setProps({
      id: "1",
      name: "Kabisa",
      userRole: "Admin",
    });
  });

  it("shows the team name", () => {
    renderComponent();

    expect(screen.getByText("Kabisa")).toBeInTheDocument();
  });

  it("sets the team id on button click", () => {
    renderComponent();

    screen.getByRole("button").click();

    expect(Storage.setItem).toHaveBeenCalledWith("team_id", "1");
  });

  it("sets the user role on button click", () => {
    renderComponent();

    screen.getByRole("button").click();
    expect(Storage.setItem).toHaveBeenCalledWith("team_role", "Admin");
  });

  it("navigates to the next page", () => {
    renderComponent();

    screen.getByRole("button").click();

    expect(history.location.pathname).toBe("/");
  });
});
