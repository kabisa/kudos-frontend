import { createMemoryHistory, MemoryHistory } from "history";
import { withMockedProviders } from "../../../spec_helper";
import TeamRow from "./TeamRow";
import { Storage } from "../../../support/storage";
import { render, screen } from "@testing-library/react";

describe("<TeamRow />", () => {
  let history: MemoryHistory;

  beforeEach(() => {
    history = createMemoryHistory();
    Storage.setItem = jest.fn();

    render(
      withMockedProviders(<TeamRow id="1" name="Kabisa" userRole="Admin" />),
    );
  });

  it("shows the team name", () => {
    expect(screen.getByText("Kabisa")).toBeInTheDocument();
  });

  it("sets the team id on button click", () => {
    screen.getByRole("button").click();

    expect(Storage.setItem).toBeCalledWith("team_id", "1");
  });

  it("sets the user role on button click", () => {
    screen.getByRole("button").click();
    expect(Storage.setItem).toBeCalledWith("team_role", "Admin");
  });

  it("navigates to the next page", () => {
    screen.getByRole("button").click();

    expect(history.location.pathname).toBe("/");
  });
});
