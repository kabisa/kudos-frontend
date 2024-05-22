import { mockLocalstorage, withMockedProviders } from "../../../../spec_helper";
import { KudometerRow } from "./KudometerRow";
import {
  DELETE_KUDOMETER,
  GET_KUDOMETERS,
  Kudometer,
  SET_ACTIVE_KUDOS_METER,
} from "./KudometerQueries";
import { GET_GOAL_PERCENTAGE } from "../../../feed/queries";
import { render, screen, waitFor } from "@testing-library/react";

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

const setup = (kudometer: Kudometer) => {
  mutationCalled = false;
  makeActiveMutationCalled = false;
  queryCalled = false;
  render(
    withMockedProviders(
      <table>
        <tbody>
          <KudometerRow
            key="1"
            kudometer={kudometer}
            viewButtonClickHandler={viewButtonHandler}
            deleteKudometerHandler={deleteHandler}
            edit={editHandler}
          />
        </tbody>
      </table>,
      mocks,
    ),
  );
};

describe("<KudometerRow />", () => {
  beforeEach(() => {
    global.confirm = jest.fn(() => true);
    mockLocalstorage("1");
  });

  it("shows the kudometer name", async () => {
    setup(getKudometer(false));
    expect(
      await screen.findByRole("cell", { name: "First kudometer" }),
    ).toBeInTheDocument();
  });

  it("opens the goals", async () => {
    setup(getKudometer(false));
    const goalButton = screen.getByRole("button", { name: "View goals" });
    goalButton.click();

    await waitFor(() => {
      expect(viewButtonHandler).toBeCalledTimes(1);
    });
  });

  it("has a confirm delete button", async () => {
    setup(getKudometer(false));
    const deleteButton = screen.getByRole("button", { name: "delete" });
    deleteButton.click();

    await waitFor(() => {
      expect(global.confirm).toBeCalledWith(
        "Are you sure you want to delete this kudometer?",
      );
    });
  });

  it("calls the delete mutation", async () => {
    setup(getKudometer(false));
    const deleteButton = screen.getByRole("button", { name: "delete" });
    deleteButton.click();

    await waitFor(() => {
      expect(mutationCalled).toBe(true);
      expect(queryCalled).toBe(true);
    });
  });

  it("has a edit button", () => {
    setup(getKudometer(false));
    const editButton = screen.getByRole("button", { name: "edit" });
    expect(editButton).toBeInTheDocument();
  });

  it("calls the edit function", async () => {
    setup(getKudometer(false));
    const editButton = screen.getByRole("button", { name: "edit" });
    editButton.click();

    expect(editHandler).toBeCalledTimes(1);
  });

  describe("make active button", () => {
    it("is not disabled if the kudometer is not active", () => {
      setup(getKudometer(false));
      const activateButton = screen.getByRole("button", {
        name: "Set as active",
      });
      expect(activateButton).not.toBeDisabled();
    });

    it("is disabled if the kudometer is active", () => {
      setup(getKudometer(true));
      const activateButton = screen.getByRole("button", {
        name: "Already active",
      });
      expect(activateButton).toBeDisabled();
    });

    it("calls the mutation", async () => {
      setup(getKudometer(false));

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
