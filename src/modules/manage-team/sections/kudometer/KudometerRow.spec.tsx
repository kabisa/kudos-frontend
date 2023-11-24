import { mount, ReactWrapper } from "enzyme";
import { act } from "react-dom/test-utils";
import {
  findByTestId,
  mockLocalstorage,
  wait,
  withMockedProviders,
} from "../../../../spec_helper";
import { KudometerRow } from "./KudometerRow";
import {
  DELETE_KUDOMETER,
  GET_KUDOMETERS,
  Kudometer,
  SET_ACTIVE_KUDOS_METER,
} from "./KudometerQueries";
import { GET_GOAL_PERCENTAGE } from "../../../feed/queries";

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

let wrapper: ReactWrapper;
const viewButtonHandler = jest.fn();
const deleteHandler = jest.fn();
const editHandler = jest.fn();

const setup = (kudometer: Kudometer) => {
  mutationCalled = false;
  makeActiveMutationCalled = false;
  queryCalled = false;
  wrapper = mount(
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

describe.skip("<KudometerRow />", () => {
  beforeEach(() => {
    mockLocalstorage("1");
    setup(getKudometer(false));
  });

  it("shows the kudometer name", () => {
    expect(wrapper.containsMatchingElement(<td>First kudometer</td>)).toBe(
      true,
    );
  });

  it("opens the goals", async () => {
    await act(async () => {
      findByTestId(wrapper, "goal-button").hostNodes().simulate("click");

      await wrapper.update();

      expect(viewButtonHandler).toBeCalledTimes(1);
    });
  });

  it("has a confirm delete button", async () => {
    await act(async () => {
      findByTestId(wrapper, "delete-button").hostNodes().simulate("click");

      await wait(0);
      await wrapper.update();

      expect(
        findByTestId(wrapper, "confirm-delete-button").hostNodes().length,
      ).toBe(1);
    });
  });

  it("calls the delete mutation", async () => {
    await act(async () => {
      findByTestId(wrapper, "delete-button").hostNodes().simulate("click");

      await wait(0);
      await wrapper.update();

      findByTestId(wrapper, "confirm-delete-button")
        .hostNodes()
        .simulate("click");

      await wait(0);
      await wrapper.update();

      expect(mutationCalled).toBe(true);

      await wait(0);
      await wrapper.update();

      expect(queryCalled).toBe(true);
    });
  });

  it("has a edit button", () => {
    expect(findByTestId(wrapper, "edit-button").hostNodes().length).toBe(1);
  });

  it("calls the edit function", async () => {
    findByTestId(wrapper, "edit-button").hostNodes().simulate("click");

    expect(editHandler).toBeCalledTimes(1);
  });

  describe.skip("make active button", () => {
    it("is not disabled if the kudometer is not active", () => {
      const button = findByTestId(wrapper, "set-active-button").find("Button");
      expect(button.prop("disabled")).toBe(false);
    });

    it("the text says make active if the kudometer is not active", () => {
      const button = findByTestId(wrapper, "set-active-button").find("Button");
      expect(button.text()).toBe("Set as active");
    });

    it("is disabled if the kudometer is active", () => {
      setup(getKudometer(true));

      const button = findByTestId(wrapper, "set-active-button").find("Button");
      expect(button.prop("disabled")).toBe(true);
    });

    it("the text says already active if the kudometer is active", () => {
      setup(getKudometer(true));

      const button = findByTestId(wrapper, "set-active-button").find("Button");
      expect(button.text()).toBe("Already active");
    });

    it("calls the mutation", async () => {
      await act(async () => {
        findByTestId(wrapper, "set-active-button")
          .hostNodes()
          .simulate("click");

        await wait(0);
        await wrapper.update();

        expect(makeActiveMutationCalled).toBe(true);
      });
    });
  });
});
