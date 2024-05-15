import { render, screen } from "@testing-library/react";
import { mockLocalstorage, withMockedProviders } from "../../../spec_helper";
import RightRail from "./RightRail";
import { mocks as goalMocks } from "../../statistics/Statistics.spec";

describe("<RightRail />", () => {
  beforeEach(async () => {
    mockLocalstorage("1");
    render(withMockedProviders(<RightRail />, goalMocks("1")));
  });

  it("renders the statistics section", async () => {
    const element = await screen.findByText("₭udometer");
    expect(element).toBeInTheDocument();
  });
});
