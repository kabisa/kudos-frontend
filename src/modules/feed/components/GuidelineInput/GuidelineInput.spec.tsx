import { mockLocalstorage } from "../../../../spec_helper";
import {
  getSelectOptions,
  getSelectedItemsText,
  openSelect,
} from "../../../../support/testing/reactSelectHelpers";
import {
  makeFC,
  setTestSubject,
} from "../../../../support/testing/testSubject";
import { dataDecorator } from "../../../../support/testing/testDecorators";
import { GET_GUIDELINES } from "../../../manage-team/sections/guideline/GuidelinesSection";
import GuidelineInput from "./GuidelineInput";
import { waitFor, screen } from "@testing-library/react";

let queryCalled = false;
const mocks = [
  {
    request: {
      query: GET_GUIDELINES,
      variables: { team_id: "1" },
    },
    result: () => {
      queryCalled = true;
      return {
        data: {
          teamById: {
            id: "1",
            __typename: "Team",
            guidelines: [
              {
                id: "1",
                kudos: 10,
                name: "Op tijd bij meeting",
              },
              {
                id: "2",
                kudos: 15,
                name: "Bureau opgeruimd",
              },
            ],
          },
        },
      };
    },
  },
];
const mocksWithoutData = [
  {
    request: {
      query: GET_GUIDELINES,
      variables: { team_id: "1" },
    },
    result: () => {
      queryCalled = true;
      return {
        data: {
          teamById: {
            id: "1",
            __typename: "Team",
            guidelines: [],
          },
        },
      };
    },
  },
];

describe("<GuidelineInput />", () => {
  const handleChangeMock = jest.fn();

  const { renderComponent, updateDecorator } = setTestSubject(
    makeFC(GuidelineInput),
    {
      decorators: [dataDecorator(mocks)],
      props: {
        handleChange: handleChangeMock,
        amountError: false,
      },
    },
  );

  beforeEach(() => {
    mockLocalstorage("1");
    queryCalled = false;
  });

  it("handles state change correctly", async () => {
    renderComponent();

    const selectElement = await screen.findByRole("combobox", {
      description: "Kudos amount",
    });
    openSelect(selectElement);
    const options = getSelectOptions(selectElement);
    options[0].click();

    expect(getSelectedItemsText(selectElement)).toEqual("10");
  });

  it("display only guidelines that have a kudos value within a range of 5 from the selected guideline.", async () => {
    updateDecorator("application", (settings) => {
      const modifiedMock = [...settings.mocks];
      modifiedMock[0] = {
        ...mocks[0],
        result: () => {
          queryCalled = true;
          return {
            data: {
              teamById: {
                id: "1",
                __typename: "Team",
                guidelines: [
                  {
                    id: "1",
                    kudos: 4,
                    name: "Great help for someone",
                  },
                  {
                    id: "2",
                    kudos: 11,
                    name: "Op tijd bij meeting",
                  },
                  {
                    id: "3",
                    kudos: 14, // Within range of 10
                    name: "Bureau opgeruimd",
                  },
                ],
              },
            },
          };
        },
      };
      return { mocks: modifiedMock };
    });

    renderComponent();

    // Sets showGuidelines to true which is needed to trigger the query.
    const selectElement = await screen.findByRole("combobox", {
      description: "Kudos amount",
    });
    openSelect(selectElement);

    const options = getSelectOptions(selectElement);
    expect(options).toHaveLength(3);
    options[1].click();
    expect(getSelectedItemsText(selectElement)).toEqual("11");

    // Update input reference after clicking the first row
    const updatedSelectElement = await screen.findByRole("combobox");
    openSelect(updatedSelectElement);

    const updatedOptions = getSelectOptions(updatedSelectElement);
    // Only shows 2 rows because 14 is within range of 10
    expect(updatedOptions).toHaveLength(2);
  });

  it("shows the guidelines on down arrow", async () => {
    renderComponent();

    // Sets showGuidelines to true which is needed to trigger the query.
    const selectElement = await screen.findByRole("combobox", {
      description: "Kudos amount",
    });
    const options = getSelectOptions(selectElement);
    expect(options).toHaveLength(0);

    openSelect(selectElement);

    const updatedOptions = getSelectOptions(selectElement);
    expect(updatedOptions).toHaveLength(2);
  });

  it("calls the mutation if the input is focused and amount is not empty", async () => {
    renderComponent();

    expect(queryCalled).toBe(false);

    // Sets showGuidelines to true which is needed to trigger the query.
    const selectElement = await screen.findByRole("combobox", {
      description: "Kudos amount",
    });
    openSelect(selectElement);

    await waitFor(() => {
      expect(queryCalled).toBe(true);
    });
  });

  it("shows a message when there are no guidelines", async () => {
    updateDecorator("application", { mocks: mocksWithoutData });
    renderComponent();

    // Sets showGuidelines to true which is needed to trigger the query.
    const selectElement = await screen.findByRole("combobox", {
      description: "Kudos amount",
    });
    openSelect(selectElement);

    expect(await screen.findByText("No options")).toBeInTheDocument();
  });

  it("is disabled when the query is loading", async () => {
    renderComponent();

    const selectElement = screen.getByRole("combobox", {
      description: "Kudos amount",
      hidden: true,
    });
    expect(selectElement).toBeDisabled();

    // wait for query to complete to prevent unmount while getting state changes
    await screen.findByRole("combobox", {
      description: "Kudos amount",
    });
  });

  it("reports the correct amount when a guideline is clicked", async () => {
    renderComponent();

    // Sets showGuidelines to true which is needed to trigger the query.
    const selectElement = await screen.findByRole("combobox", {
      description: "Kudos amount",
    });
    openSelect(selectElement);
    const options = getSelectOptions(selectElement);
    options[1].click();

    expect(handleChangeMock).toHaveBeenCalledWith(15);
    expect(getSelectedItemsText(selectElement)).toEqual("15");
  });
});
