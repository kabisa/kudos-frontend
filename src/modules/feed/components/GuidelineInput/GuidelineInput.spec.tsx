import { GET_GUIDELINES } from "../../../../common/graphql/queries/getGuidelines.graphql";
import { mockLocalstorage, withMockedProviders } from "../../../../spec_helper";
import GuidelineInput from "./GuidelineInput";
import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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
            guidelines: [
              {
                id: "1",
                kudos: "10",
                name: "Op tijd bij meeting",
              },
              {
                id: "2",
                kudos: "15",
                name: "Bureau opgeruimd",
              },
            ],
          },
        },
      };
    },
  },
];
const mocksWithError = [
  {
    request: {
      query: GET_GUIDELINES,
      variables: { team_id: "1" },
    },
    error: new Error("It broke"),
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
            guidelines: [],
          },
        },
      };
    },
  },
];

describe.skip("<GuidelineInput />", () => {
  const handleChangeMock = jest.fn();

  beforeEach(() => {
    mockLocalstorage("1");
    queryCalled = false;
  });

  it("handles state change correctly", async () => {
    render(
      withMockedProviders(
        <GuidelineInput handleChange={handleChangeMock} amountError={false} />,
        mocks,
      ),
    );

    // Sets showGuidelines to true which is needed to trigger the query.
    const input = screen.getByRole("spinbutton", { name: "Kudos Amount" });
    input.focus();

    const rows = await screen.findAllByTestId("guideline-row");
    await userEvent.click(rows[0]);
    expect(input).toHaveValue(10);
  });

  it("display only guidelines that have a kudos value within a range of 5 from the selected guideline.", async () => {
    const modifiedMock = [...mocks];
    modifiedMock[0].result = () => {
      queryCalled = true;
      return {
        data: {
          teamById: {
            guidelines: [
              {
                id: "1",
                kudos: "10",
                name: "Op tijd bij meeting",
              },
              {
                id: "2",
                kudos: "14", // Within range of 5
                name: "Bureau opgeruimd",
              },
            ],
          },
        },
      };
    };

    render(
      withMockedProviders(
        <GuidelineInput handleChange={handleChangeMock} amountError={false} />,
        modifiedMock,
      ),
    );

    // Sets showGuidelines to true which is needed to trigger the query.
    const input = screen.getByRole("spinbutton", { name: "Kudos Amount" });
    input.focus();

    const rows = await screen.findAllByTestId("guideline-row");
    await userEvent.click(rows[0]);
    expect(input).toHaveValue(10);

    // Update input reference after clicking the first row
    const updatedInput = screen.getByRole("spinbutton", {
      name: "Kudos Amount",
    });
    updatedInput.focus();

    const updatedRows = await screen.findAllByTestId("guideline-row");
    // Only shows 2 rows because 14 is within range of 10
    expect(updatedRows).toHaveLength(2);
  });

  it("shows the guidelines on focus", async () => {
    render(
      withMockedProviders(
        <GuidelineInput handleChange={handleChangeMock} amountError={false} />,
        mocks,
      ),
    );

    // Sets showGuidelines to true which is needed to trigger the query.
    screen.getByRole("spinbutton", { name: "Kudos Amount" }).focus();

    const rows = await screen.findAllByTestId("guideline-row");
    expect(rows).toHaveLength(2);
  });

  it("resets the focus on blur", async () => {
    render(
      withMockedProviders(
        <GuidelineInput handleChange={handleChangeMock} amountError={false} />,
        mocks,
      ),
    );

    // Sets showGuidelines to true which is needed to trigger the query.
    const input = screen.getByRole("spinbutton", { name: "Kudos Amount" });
    input.focus();

    // Validate that showGuidelines is true.
    const rows = await screen.findAllByTestId("guideline-row");
    expect(rows).toHaveLength(2);

    // Validate that showGuidelines is false after blur event.
    input.blur();
    await waitFor(() => {
      expect(screen.queryAllByTestId("guideline-row")).toHaveLength(0);
    });
  });

  it("calls the mutation if the input is focused and amount is not empty", async () => {
    render(
      withMockedProviders(
        <GuidelineInput handleChange={handleChangeMock} amountError={false} />,
        mocks,
      ),
    );

    expect(queryCalled).toBe(false);

    // Sets showGuidelines to true which is needed to trigger the query.
    screen.getByRole("spinbutton", { name: "Kudos Amount" }).focus();

    await waitFor(() => {
      expect(queryCalled).toBe(true);
    });
  });

  it("Shows when there is an error", async () => {
    render(
      withMockedProviders(
        <GuidelineInput handleChange={handleChangeMock} amountError={false} />,
        mocksWithError,
      ),
    );

    // Sets showGuidelines to true which is needed to trigger the query.
    screen.getByRole("spinbutton", { name: "Kudos Amount" }).focus();

    expect(await screen.findByText("It broke")).toBeInTheDocument();
  });

  it("Shows a message when there are no guidelines", async () => {
    render(
      withMockedProviders(
        <GuidelineInput handleChange={handleChangeMock} amountError={false} />,
        mocksWithoutData,
      ),
    );

    // Sets showGuidelines to true which is needed to trigger the query.
    screen.getByRole("spinbutton", { name: "Kudos Amount" }).focus();

    expect(
      await screen.findByText("No guidelines available"),
    ).toBeInTheDocument();
  });

  it("Shows when the query is loading", async () => {
    render(
      withMockedProviders(
        <GuidelineInput handleChange={handleChangeMock} amountError={false} />,
        mocks,
      ),
    );

    // Sets showGuidelines to true which is needed to trigger the query.
    await waitFor(async () => {
      screen.getByRole("spinbutton", { name: "Kudos Amount" }).focus();
      expect(await screen.findByText("Loading...")).toBeInTheDocument();
    });
  });

  it("renders a segment for each guideline", async () => {
    render(
      withMockedProviders(
        <GuidelineInput handleChange={handleChangeMock} amountError={false} />,
        mocks,
      ),
    );

    // Sets showGuidelines to true which is needed to trigger the query.
    screen.getByRole("spinbutton", { name: "Kudos Amount" }).focus();

    const rows = await screen.findAllByTestId("guideline-row");
    expect(rows).toHaveLength(2);
  });

  it("it shows the guidelines when the button is clicked", async () => {
    render(
      withMockedProviders(
        <GuidelineInput handleChange={handleChangeMock} amountError={false} />,
        mocks,
      ),
    );

    const button = screen.getByTestId("guidelines-button");
    userEvent.click(button);

    const rows = await screen.findAllByTestId("guideline-row");
    expect(rows).toHaveLength(2);
  });

  it("should set the correct amount when a guideline is clicked", async () => {
    render(
      withMockedProviders(
        <GuidelineInput handleChange={handleChangeMock} amountError={false} />,
        mocks,
      ),
    );

    // Sets showGuidelines to true which is needed to trigger the query.
    const input = screen.getByRole("spinbutton", { name: "Kudos Amount" });
    input.focus();

    const rows = await screen.findAllByTestId("guideline-row");
    expect(rows).toHaveLength(2);
    await userEvent.click(rows[0]);

    await waitFor(() => {
      expect(screen.queryAllByTestId("guideline-row")).toHaveLength(0);
    });

    expect(input).toHaveValue(10);
  });
});
