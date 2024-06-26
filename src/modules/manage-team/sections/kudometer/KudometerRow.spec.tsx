import { MockedFunction, mockLocalstorage } from "../../../../spec_helper";
import { KudometerRow } from "./KudometerRow";
import {
  DELETE_KUDOMETER,
  GET_KUDOMETERS,
  Kudometer,
  SET_ACTIVE_KUDOS_METER,
} from "./KudometerQueries";
import { GET_GOAL_PERCENTAGE } from "../../../feed/queries";
import { screen, waitFor } from "@testing-library/react";
import { setTestSubject } from "../../../../support/testing/testSubject";
import {
  dataDecorator,
  tableDecorator,
} from "../../../../support/testing/testDecorators";

const getKudometer = (isActive: boolean): Kudometer => ({
  id: "1",
  name: "First kudometer",
  goals: [],
  isActive,
});

let mutationCalled = false;
let makeActiveMutationCalled = false;
let queryCalled = false;
const mocks = [
  {
    request: {
      query: DELETE_KUDOMETER,
      variables: { id: "1" },
    },
    result: () => {
      mutationCalled = true;
      return {
        data: {
          deleteKudosMeter: {
            kudosMeterId: "1",
          },
        },
      };
    },
  },
  {
    request: {
      query: GET_GOAL_PERCENTAGE,
      variables: { team_id: "1" },
    },
    result: {
      data: {
        teamById: {
          id: "1",
          activeKudosMeter: {
            amount: 10,
          },
          activeGoals: [],
        },
      },
    },
  },
  {
    request: {
      query: SET_ACTIVE_KUDOS_METER,
      variables: { team_id: "1", kudos_meter_id: "1" },
    },
    result: () => {
      makeActiveMutationCalled = true;
      return {
        data: {
          setActiveKudosMeter: {
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
    result: () => {
      queryCalled = true;
      return {
        data: {
          teamById: {
            id: "1",
            __tyename: "Team",
            kudosMeters: [
              {
                id: "1",
                name: "Kudometer",
                isActive: true,
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
      };
    },
  },
];

const viewButtonHandler = jest.fn();
const deleteHandler = jest.fn();
const editHandler = jest.fn();

describe("<KudometerRow />", () => {
  const { renderComponent, updateProps } = setTestSubject(KudometerRow, {
    decorators: [tableDecorator, dataDecorator(mocks)],
    props: {
      key: "1",
      kudometer: getKudometer(false),
      viewButtonClickHandler: viewButtonHandler,
      deleteKudometerHandler: deleteHandler,
      edit: editHandler,
    },
  });

  beforeEach(() => {
    global.confirm = jest.fn(() => true);
    mutationCalled = false;
    makeActiveMutationCalled = false;
    queryCalled = false;
    mockLocalstorage("1");
  });

  it("shows the kudometer name", async () => {
    renderComponent();

    expect(
      await screen.findByRole("cell", { name: "First kudometer" }),
    ).toBeInTheDocument();
  });

  it("opens the goals", async () => {
    renderComponent();

    const goalButton = screen.getByRole("button", { name: "View goals" });
    goalButton.click();

    await waitFor(() => {
      expect(viewButtonHandler).toHaveBeenCalledTimes(1);
    });
  });

  it("has a confirm delete button", async () => {
    renderComponent();

    const deleteButton = screen.getByRole("button", { name: "delete" });
    deleteButton.click();

    await waitFor(() => {
      expect(global.confirm).toBeCalledWith(
        "Are you sure you want to delete this kudometer?",
      );
    });
  });

  it("calls the delete mutation", async () => {
    renderComponent();

    const deleteButton = screen.getByRole("button", { name: "delete" });
    deleteButton.click();

    await waitFor(() => {
      expect(mutationCalled).toBe(true);
      expect(queryCalled).toBe(true);
    });
  });

  it("does not the delete mutation if confirm is cancelled", async () => {
    renderComponent();

    (global.confirm as MockedFunction<Window["confirm"]>).mockReturnValueOnce(
      true,
    );
    const deleteButton = screen.getByRole("button", { name: "delete" });
    deleteButton.click();

    await waitFor(() => expect(mutationCalled).toBe(true));
  });

  it("has a edit button", () => {
    renderComponent();

    const editButton = screen.getByRole("button", { name: "edit" });
    expect(editButton).toBeInTheDocument();
  });

  it("calls the edit function", () => {
    renderComponent();

    const editButton = screen.getByRole("button", { name: "edit" });
    editButton.click();

    expect(editHandler).toHaveBeenCalledTimes(1);
  });

  describe("make active button", () => {
    it("is not disabled if the kudometer is not active", () => {
      renderComponent();

      const activateButton = screen.getByRole("button", {
        name: "Set as active",
      });
      expect(activateButton).not.toBeDisabled();
    });

    it("is disabled if the kudometer is active", () => {
      updateProps({ kudometer: getKudometer(true) });
      renderComponent();

      const activateButton = screen.getByRole("button", {
        name: "Already active",
      });
      expect(activateButton).toBeDisabled();
    });

    it("calls the mutation", async () => {
      renderComponent();

      const activateButton = screen.getByRole("button", {
        name: "Set as active",
      });
      activateButton.click();

      await waitFor(() => {
        expect(makeActiveMutationCalled).toBe(true);
      });
    });
  });
});
