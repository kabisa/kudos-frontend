import { setComponent } from "../../support/testing/testComponent";
import CustomCircle from "./Circle";
import { screen } from "@testing-library/react";

describe("<CustomCircle />", () => {
  const { setProps, renderComponent } = setComponent(CustomCircle);
  setProps({
    percent: 50,
    currentKudos: 200,
    neededKudos: 500,
    goal: "Some goal",
  });

  beforeEach(() => {
    renderComponent();
  });

  it("renders the correct current kudo amount", () => {
    const summary = screen.getByRole("heading", { level: 2, name: "200 ₭" });

    expect(summary).toBeInTheDocument();
  });

  it("renders the correct goal", () => {
    const summary = screen.getByTestId("goal-kudos");
    expect(summary.textContent).toEqual("of 500₭ for Some goal");
    expect(summary).toBeInTheDocument();
  });
});
