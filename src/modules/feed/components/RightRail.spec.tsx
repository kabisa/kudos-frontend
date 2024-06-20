import { screen } from "@testing-library/react";
import { mockLocalstorage } from "../../../spec_helper";
import RightRail from "./RightRail";
import { mocks as goalMocks } from "../../statistics/Statistics.spec";
import { setComponent } from "../../../support/testing/testComponent";
import { applicationContext } from "../../../support/testing/testContexts";

describe("<RightRail />", () => {
  const { setProps, renderComponent } = setComponent(
    RightRail,
    applicationContext(goalMocks("1")),
  );
  setProps({});

  beforeEach(() => {
    mockLocalstorage("1");
  });

  it("renders the statistics section", async () => {
    renderComponent();

    const element = await screen.findByText("₭udometer");
    expect(element).toBeInTheDocument();
  });
});
