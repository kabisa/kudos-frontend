import { createMemoryHistory, MemoryHistory } from "history";
import TeamRow from "./TeamRow";
import { Storage } from "../../../support/storage";
import { screen } from "@testing-library/react";
import { setTestSubject } from "../../../support/testing/testSubject";
import { routingDecorator } from "../../../support/testing/testDecorators";

describe("<TeamRow />", () => {
  let history: MemoryHistory;
  const { renderComponent } = setTestSubject(TeamRow, {
    decorators: [routingDecorator()],
    props: {
      id: "1",
      name: "Kabisa",
      userRole: "Admin",
    },
  });

  beforeEach(() => {
    history = createMemoryHistory();
    Storage.setItem = jest.fn();
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
