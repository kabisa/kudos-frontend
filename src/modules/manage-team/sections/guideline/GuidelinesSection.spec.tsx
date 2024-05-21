import { mount, ReactWrapper } from "enzyme";
import { act } from "react-dom/test-utils";
import {
  findByTestId,
  mockLocalstorage,
  wait,
  withMockedProviders,
} from "../../../../spec_helper";
import GuidelineSection, { GET_GUIDELINES } from "./GuidelinesSection";
import { render, screen } from "@testing-library/react";

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
  beforeEach(() => {
    mockLocalstorage("1");
  });

  it("shows a loading state", async () => {
    render(withMockedProviders(<GuidelineSection />, mocks("1")));
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Wait for fetch to complete before unmount
    expect(await screen.findByText("first guideline")).toBeInTheDocument();
  });

  it("shows when there is an error", async () => {
    render(withMockedProviders(<GuidelineSection />, errorMocks));
    expect(await screen.findByText("Error! it went wrong")).toBeInTheDocument();
  });

  it("shows a row for each guideline ", async () => {
    render(withMockedProviders(<GuidelineSection />, mocks("1")));

    const rows = await screen.findAllByRole("row");
    // 1 header row, 2 data rows
    expect(rows).toHaveLength(1 + 2);
  });
});
