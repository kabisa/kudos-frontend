import { mockLocalstorage } from "../../../../spec_helper";
import {
  makeFC,
  setComponent,
} from "../../../../support/testing/testComponent";
import { applicationContext } from "../../../../support/testing/testContexts";
import GuidelineSection, { GET_GUIDELINES } from "./GuidelinesSection";
import { screen } from "@testing-library/react";

export const mocks = (teamId: string) => [
  {
    request: {
      query: GET_GUIDELINES,
      variables: { team_id: teamId },
    },
    result: {
      data: {
        teamById: {
          id: teamId,
          __typename: "Team",
          guidelines: [
            {
              id: "1",
              kudos: 5,
              name: "first guideline",
              __typename: "Guideline",
            },
            {
              id: "2",
              kudos: 10,
              name: "second guideline",
              __typename: "Guideline",
            },
          ],
        },
      },
    },
  },
];

const errorMocks = [
  {
    request: {
      query: GET_GUIDELINES,
      variables: { team_id: "1" },
    },
    error: new Error("it went wrong"),
  },
];

describe("<GuidelinesSection />", () => {
  const { setProps, renderComponent, updateDecorator } = setComponent(
    makeFC(GuidelineSection),
    applicationContext(mocks("1")),
  );
  setProps({});

  beforeEach(() => {
    mockLocalstorage("1");
  });

  it("shows a loading state", async () => {
    renderComponent();

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Wait for fetch to complete before unmount
    expect(await screen.findByText("first guideline")).toBeInTheDocument();
  });

  it("shows when there is an error", async () => {
    updateDecorator("application", { mocks: errorMocks });
    renderComponent();

    expect(await screen.findByText("Error! it went wrong")).toBeInTheDocument();
  });

  it("shows a row for each guideline ", async () => {
    renderComponent();

    const rows = await screen.findAllByRole("row");
    // 1 header row, 2 data rows
    expect(rows).toHaveLength(1 + 2);
  });
});
