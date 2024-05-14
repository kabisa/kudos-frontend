import { mount, ReactWrapper } from "enzyme";
import { act } from "react-dom/test-utils";
import {
  findByTestId,
  mockLocalstorage,
  wait,
  withMockedProviders,
} from "../../../../spec_helper";
import GuidelineSection, { GET_GUIDELINES } from "./GuidelinesSection";

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

describe.skip("<GuidelinesSection />", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    mockLocalstorage("1");
    wrapper = mount(withMockedProviders(<GuidelineSection />, mocks));
  });

  it("shows a loading state", () => {
    expect(wrapper.containsMatchingElement(<p>Loading...</p>)).toBe(true);
  });

  it("shows when there is an error", async () => {
    wrapper = mount(withMockedProviders(<GuidelineSection />, errorMocks));

    await act(async () => {
      await wait(0);
      await wrapper.update();

      expect(wrapper.containsMatchingElement(<p>Error! it went wrong</p>)).toBe(
        true,
      );
    });
  });

  it("shows a row for each guideline ", async () => {
    await act(async () => {
      await wait(0);
      await wrapper.update();

      const rows = findByTestId(wrapper, "guideline-row");

      expect(rows.length).toBe(2);
    });
  });
});
