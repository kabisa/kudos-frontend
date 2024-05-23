import {
  mockLocalstorage,
  withMockedProviders,
} from "../../../../../spec_helper";
import { GoalRow } from "./GoalRow";
import { DELETE_GOAL, GET_KUDOMETERS, Goal } from "../KudometerQueries";
import { render, RenderResult, screen, waitFor } from "@testing-library/react";

let mutationCalled = false;
let queryCalled = false;
const mocks = [
  {
    request: {
      query: DELETE_GOAL,
      variables: { id: "1" },
    },
    result: () => {
      mutationCalled = true;
      return {
        data: {
          deleteGoal: {
            goalId: "1",
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
      };
    },
  },
];

const goal: Goal = {
  id: "1",
  name: "Hapje eten",
  amount: 100,
};

describe("<GoalRow />", () => {
  let component: RenderResult;
  const editGoalMock = jest.fn(() => 1);

  beforeEach(() => {
    mockLocalstorage("1");
    global.confirm = jest.fn(() => true);
    mutationCalled = false;
    queryCalled = false;
    component = render(
      withMockedProviders(
        <table>
          <tbody>
            <GoalRow key={goal.id} goal={goal} editGoal={editGoalMock} />
          </tbody>
        </table>,
        mocks,
      ),
    );
  });

  it("renders all the information", () => {
    expect(screen.getByRole("cell", { name: goal.name })).toBeInTheDocument();
    expect(
      screen.getByRole("cell", { name: `${goal.amount}` }),
    ).toBeInTheDocument();
  });

  it("calls the edit goal function", async () => {
    const editButton = screen.getByRole("button", { name: "edit" });
    editButton.click();

    expect(editGoalMock).toBeCalledTimes(1);
  });

  it("has a delete confirm button", async () => {
    const deleteButton = screen.getByRole("button", { name: "delete" });
    deleteButton.click();

    expect(global.confirm).toBeCalledWith(
      "Are you sure you want to delete this goal?",
    );
  });

  it("calls the delete mutation and the refetch query", async () => {
    const deleteButton = screen.getByRole("button", { name: "delete" });
    deleteButton.click();

    await waitFor(() => {
      expect(mutationCalled).toBe(true);
      expect(queryCalled).toBe(true);
    });
  });
});
