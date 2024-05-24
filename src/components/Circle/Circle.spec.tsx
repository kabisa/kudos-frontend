import { withMockedProviders } from "../../spec_helper";
import CustomCircle from "./Circle";
import { render, screen } from "@testing-library/react";

describe("<CustomCircle />", () => {
  beforeEach(() => {
    render(
      withMockedProviders(
        <CustomCircle
          percent={50}
          currentKudos={200}
          neededKudos={500}
          goal="Some goal"
        />,
      ),
    );
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
