import { mockLocalstorage } from "../../../../spec_helper";
import KudometerSection from "./KudometerSection";
import {
  CREATE_KUDOMETER,
  GET_KUDOMETERS,
  UPDATE_KUDOMETER,
} from "./KudometerQueries";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import {
  makeFC,
  setTestSubject,
} from "../../../../support/testing/testSubject";
import { dataDecorator } from "../../../../support/testing/testDecorators";

let createMutationCalled = false;
let editMutationCalled = false;
const mocks = [
  {
    request: {
      query: CREATE_KUDOMETER,
      variables: {
        name: "Test kudometer",
        team_id: "1",
      },
    },
    result: () => {
      createMutationCalled = true;
      return {
        data: {
          createKudosMeter: {
            kudosMeter: {
              id: "1",
            },
          },
        },
      };
    },
  },
  {
    request: {
      query: UPDATE_KUDOMETER,
      variables: {
        name: "Test kudometer",
        kudos_meter_id: "1",
      },
    },
    result: () => {
      editMutationCalled = true;
      return {
        data: {
          updateKudosMeter: {
            kudosMeter: {
              id: "1",
            },
          },
        },
      };
    },
  },
  {
    request: {
      query: GET_KUDOMETERS,
      variables: { team_id: "1" },
    },
    result: {
      data: {
        teamById: {
          id: "1",
          __typename: "Team",
          kudosMeters: [
            {
              id: "1",
              name: "First kudometer",
              goals: [],
              isActive: false,
            },
            {
              id: "2",
              name: "Second kudometer",
              goals: [],
              isActive: false,
            },
          ],
        },
      },
    },
  },
  {
    request: {
      query: GET_KUDOMETERS,
      variables: { team_id: "1" },
    },
    result: {
      data: {
        teamById: {
          id: "1",
          __typename: "Team",
          kudosMeters: [
            {
              id: "1",
              name: "First kudometer",
              goals: [],
              isActive: false,
            },
            {
              id: "2",
              name: "Second kudometer",
              goals: [],
              isActive: false,
            },
          ],
        },
      },
    },
  },
];

const mocksWithError = [
  {
    request: {
      query: GET_KUDOMETERS,
      variables: { team_id: "1" },
    },
    error: new Error("Something went wrong"),
  },
];

const mocksWithoutData = [
  {
    request: {
      query: GET_KUDOMETERS,
      variables: { team_id: "1" },
    },
    result: {
      data: {
        teamById: {
          id: "1",
          __typename: "Team",
          kudosMeters: [],
        },
      },
    },
  },
];

describe("<KudometerSection />", () => {
  const { renderComponent, updateDecorator } = setTestSubject(
    makeFC(KudometerSection),
    { decorators: [dataDecorator(mocks)], props: {} },
  );

  beforeEach(() => {
    mockLocalstorage("1");
    createMutationCalled = false;
    editMutationCalled = false;
  });

  it("shows a loading state", async () => {
    renderComponent();

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText("Loading...")).toBeNull();
    });
  });

  it("shows when there are no kudometers", async () => {
    updateDecorator("application", { mocks: mocksWithoutData });
    renderComponent();

    expect(
      await screen.findByRole("cell", { name: "No kudometers available" }),
    ).toBeInTheDocument();
  });

  it("shows when there is an error", async () => {
    updateDecorator("application", { mocks: mocksWithError });
    renderComponent();

    expect(
      await screen.findByText("Error! Something went wrong"),
    ).toBeInTheDocument();
  });

  it("shows a row for each kudometer", async () => {
    renderComponent();

    // 1 header row, 2 data rows
    expect(await screen.findAllByRole("row")).toHaveLength(1 + 2);
  });

  describe("create kudometer", () => {
    it("calls the create mutation", async () => {
      renderComponent();

      const inputField = screen.getByRole("textbox", { name: "Name" });
      fireEvent.change(inputField, { target: { value: "Test kudometer" } });

      const createButton = screen.getByRole("button", {
        name: "Create kudometer",
      });
      createButton.click();

      await waitFor(() => {
        expect(createMutationCalled).toBe(true);
      });
    });

    it("does not call the mutation if the name is empty", async () => {
      renderComponent();

      const createButton = screen.getByRole("button", {
        name: "Create kudometer",
      });
      createButton.click();

      await waitFor(() => {
        expect(createMutationCalled).toBe(false);
      });
    });
  });

  describe("edit", () => {
    it("calls the edit mutation", async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.queryByText("Loading...")).toBeNull();
      });

      const editButtons = screen.getAllByRole("button", {
        name: "edit",
      });

      editButtons[0].click();

      const editField = screen.getByRole("textbox", { name: "Name" });
      expect(editField).toHaveValue("First kudometer");

      fireEvent.change(editField, { target: { value: "Test kudometer" } });

      const updateButton = screen.getByRole("button", {
        name: "Edit kudometer",
      });
      updateButton.click();

      await waitFor(() => {
        expect(editMutationCalled).toBe(true);
      });
    });
  });

  it("sets the selected kudometer", async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).toBeNull();
    });

    const editButtons = screen.getAllByRole("button", {
      name: "edit",
    });

    editButtons[0].click();

    const editField = screen.getByRole("textbox", { name: "Name" });
    expect(editField).toHaveValue("First kudometer");
  });

  it("deselects the selected kudometer", async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).toBeNull();
    });

    const editButtons = screen.getAllByRole("button", {
      name: "edit",
    });

    editButtons[0].click();

    const editField = screen.getByRole("textbox", { name: "Name" });
    expect(editField).toHaveValue("First kudometer");

    const editCancelButton = screen.getByRole("button", { name: "Cancel" });
    editCancelButton.click();

    const editFieldAfterCancel = screen.getByRole("textbox", { name: "Name" });
    expect(editFieldAfterCancel).toHaveValue("");
  });
});
