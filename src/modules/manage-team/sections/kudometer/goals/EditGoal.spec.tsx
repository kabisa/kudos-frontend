import { mockLocalstorage } from "../../../../../spec_helper";
import { EditGoal } from "./EditGoal";
import { CREATE_GOAL, GET_KUDOMETERS, UPDATE_GOAL } from "../KudometerQueries";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { createRef } from "react";
import {
  makeFC,
  setTestSubject,
} from "../../../../../support/testing/testSubject";
import { dataDecorator } from "../../../../../support/testing/testDecorators";

let createMutationCalled = false;
let updateMutationCalled = false;
const mocks = [
  {
    request: {
      query: CREATE_GOAL,
      variables: {
        name: "first goal",
        amount: 100,
        kudometer: "1",
      },
    },
    result: () => {
      createMutationCalled = true;
      return {
        data: {
          createGoal: {
            goal: {
              id: "1",
            },
          },
        },
      };
    },
  },
  {
    request: {
      query: UPDATE_GOAL,
      variables: {
        name: "second goal",
        amount: 200,
        goalId: "2",
      },
    },
    result: () => {
      updateMutationCalled = true;
      return {
        data: {
          updateGoal: {
            goal: {
              id: "2",
            },
          },
        },
      };
    },
  },
  {
    request: {
      query: GET_KUDOMETERS,
      variables: {
        team_id: "1",
      },
    },
    result: () => ({
      data: {
        teamById: {
          id: "1",
          __typename: "Team",
          kudosMeters: [
            {
              id: "1",
              name: "Kudometer",
              isActive: false,
              goals: [
                {
                  id: "1",
                  amount: 100,
                  name: "Uit eten",
                },
              ],
            },
          ],
        },
      },
    }),
  },
];

const mocksWithErrors = [
  {
    request: {
      query: CREATE_GOAL,
      variables: {
        name: "first goal",
        amount: 100,
        kudometer: "1",
      },
    },
    error: new Error("it broke"),
  },
];

describe("<EditGoal />", () => {
  const { renderComponent, updateProps, updateDecorator } = setTestSubject(
    makeFC(EditGoal),
    { decorators: [dataDecorator(mocks)], props: { kudometerId: "1" } },
  );

  beforeEach(() => {
    mockLocalstorage("1");
    createMutationCalled = false;
    updateMutationCalled = false;
  });

  it("has a empty initial state", () => {
    renderComponent();

    const nameField = screen.getByRole("textbox", { name: "Name" });
    expect(nameField).toHaveValue("");

    const kudoField = screen.getByRole("spinbutton", { name: "Kudos" });
    expect(kudoField).toHaveValue(null);
  });

  describe("editing goal", () => {
    beforeEach(() => {
      const ref = createRef<EditGoal>();
      updateProps({ ref });
      renderComponent();

      ref.current?.setState({ editing: true, editGoalId: "2" });
    });

    it("updates the goal", async () => {
      const nameField = screen.getByRole("textbox", { name: "Name" });
      fireEvent.change(nameField, { target: { value: "second goal" } });

      const kudoField = screen.getByRole("spinbutton", { name: "Kudos" });
      fireEvent.change(kudoField, { target: { value: "200" } });

      const submitButton = screen.getByRole("button", { name: "Update goal" });
      submitButton.click();
      await waitFor(() => {
        expect(createMutationCalled).toBe(false);
        expect(updateMutationCalled).toBe(true);
      });
    });

    it("cancels the editing with the cancel button", () => {
      const submitButton = screen.getByRole("button", { name: "Update goal" });
      expect(submitButton).toBeInTheDocument();

      const cancelButton = screen.getByRole("button", { name: "Cancel" });
      expect(cancelButton).toBeInTheDocument();

      cancelButton.click();

      const oldSubmitButton = screen.queryByRole("button", {
        name: "Update goal",
      });
      expect(oldSubmitButton).toBeNull();

      const newSubmitButton = screen.queryByRole("button", {
        name: "Create goal",
      });
      expect(newSubmitButton).toBeInTheDocument();
    });
  });

  describe("adding goal", () => {
    it("Calls the create mutation if editing is false", async () => {
      renderComponent();

      const nameField = screen.getByRole("textbox", { name: "Name" });
      fireEvent.change(nameField, { target: { value: "first goal" } });

      const kudoField = screen.getByRole("spinbutton", { name: "Kudos" });
      fireEvent.change(kudoField, { target: { value: "100" } });

      const submitButton = screen.getByRole("button", { name: "Create goal" });
      submitButton.click();
      await waitFor(() => {
        expect(createMutationCalled).toBe(true);
        expect(updateMutationCalled).toBe(false);
      });
    });
  });

  it("shows when there is an error", async () => {
    updateDecorator("application", { mocks: mocksWithErrors });
    renderComponent();

    const nameField = screen.getByRole("textbox", { name: "Name" });
    fireEvent.change(nameField, { target: { value: "first goal" } });

    const kudoField = screen.getByRole("spinbutton", { name: "Kudos" });
    fireEvent.change(kudoField, { target: { value: "100" } });

    const submitButton = screen.getByRole("button", { name: "Create goal" });
    submitButton.click();

    expect(
      await screen.findByRole("heading", {
        name: "Unable to create goal.",
        level: 3,
      }),
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Something went wrong."),
    ).toBeInTheDocument();
  });
});
