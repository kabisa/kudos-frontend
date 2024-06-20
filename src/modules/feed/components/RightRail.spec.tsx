import { screen } from "@testing-library/react";
import { mockLocalstorage } from "../../../spec_helper";
import RightRail from "./RightRail";
import { mocks as goalMocks } from "../../statistics/Statistics.spec";
import { setComponent } from "../../../support/testing/testComponent";
import { dataDecorator } from "../../../support/testing/testDecorators";

describe("<RightRail />", () => {
  const { renderComponent } = setComponent(RightRail, {
    decorators: [dataDecorator(goalMocks("1"))],
    props: {},
  });

  beforeEach(() => {
    mockLocalstorage("1");
  });

  it("renders the statistics section", async () => {
    renderComponent();

    const element = await screen.findByText("₭udometer");
    expect(element).toBeInTheDocument();
  });
});
