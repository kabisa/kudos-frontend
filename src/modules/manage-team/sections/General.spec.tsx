import { mockLocalstorage, withMockedProviders } from "../../../spec_helper";
import GeneralSection, { GET_TEAM_NAME, UPDATE_TEAM } from "./General";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

let mutationCalled = false;
const mocks = [
  {
    request: {
      query: GET_TEAM_NAME,
      variables: { id: "1" },
    },
    result: {
      data: {
        teamById: {
          name: "Kabisa",
        },
      },
    },
  },
  {
    request: {
      query: UPDATE_TEAM,
      variables: { name: "Dovetail", team_id: "1" },
    },
    result: () => {
      mutationCalled = true;
      return {
        data: {
          updateTeam: {
            team: {
              id: "1",
            },
          },
        },
      };
    },
  },
  {
    request: {
      query: GET_TEAM_NAME,
      variables: { id: "1" },
    },
    result: {
      data: {
        teamById: {
          name: "Kabisa",
        },
      },
    },
  },
];

const mocksWithError = [
  {
    request: {
      query: GET_TEAM_NAME,
      variables: { id: "1" },
    },
    error: new Error("something went wrong"),
  },
];

describe("<GeneralSection />", () => {
  beforeEach(() => {
    mockLocalstorage("1");
    mutationCalled = false;
  });

  it("shows when the query is loading", async () => {
    render(withMockedProviders(<GeneralSection />, mocks));

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(
      await screen.findByRole("heading", { name: "Kabisa" }),
    ).toBeInTheDocument();
  });

  it("shows when there is an error", async () => {
    render(withMockedProviders(<GeneralSection />, mocksWithError));

    expect(
      await screen.findByText("Error! something went wrong"),
    ).toBeInTheDocument();
  });

  it("renders the team name", async () => {
    render(withMockedProviders(<GeneralSection />, mocks));

    expect(
      await screen.findByRole("heading", { name: "Kabisa", level: 1 }),
    ).toBeInTheDocument();
  });

  it("handles input correctly", async () => {
    render(withMockedProviders(<GeneralSection />, mocks));

    await screen.findByRole("heading", { name: "Kabisa", level: 1 });

    const input = await screen.findByLabelText("New team name");
    fireEvent.change(input, { target: { value: "Dovetail" } });

    const submit = screen.getByRole("button", { name: "Update" });
    fireEvent.click(submit);

    await waitFor(() => expect(mutationCalled).toBe(true));
  });
});
