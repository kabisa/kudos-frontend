import { mount, ReactWrapper } from "enzyme";
import { act } from "react-dom/test-utils";
import {
  findByTestId,
  mockLocalstorage,
  simulateInputChange,
  wait,
  withMockedProviders,
} from "../../../../spec_helper";
import { EditGuideline } from "./EditGuideline";
import {
  CREATE_GUIDELINE,
  GET_GUIDELINES,
  UPDATE_GUIDELINE,
} from "./GuidelinesSection";

let createMutationCalled = false;
let updateMutationCalled = false;
let getGuidelinesCalled = false;

const mocks = [
  {
    request: {
      query: CREATE_GUIDELINE,
      variables: {
        name: "test guideline",
        kudos: 10,
        team_id: "1",
      },
    },
    result: () => {
      createMutationCalled = true;
      return {
        data: {
          createGuideline: {
            guideline: {
              id: "1",
            },
          },
        },
      };
    },
  },
  {
    request: {
      query: UPDATE_GUIDELINE,
      variables: {
        name: "guideline to be updated",
        kudos: 5,
        guideline: "2",
      },
    },
    result: () => {
      updateMutationCalled = true;
      return {
        data: {
          updateGuideline: {
            guideline: {
              id: "1",
            },
          },
        },
      };
    },
  },
  {
    request: {
      query: GET_GUIDELINES,
      variables: {
        team_id: "1",
      },
    },
    result: () => {
      getGuidelinesCalled = true;
      return {
        data: {
          teamById: {
            guidelines: [
              {
                id: "1",
                kudos: 10,
                name: "some guideline",
              },
            ],
          },
        },
      };
    },
  },
];

describe.skip("<EditGuideline/>", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    mockLocalstorage("1");
    updateMutationCalled = false;
    createMutationCalled = false;
    getGuidelinesCalled = false;

    wrapper = mount(withMockedProviders(<EditGuideline />, mocks));
  });

  it("calls the create mutation if editing is set to false", async () => {
    const component = wrapper.find("EditGuideline").instance();
    await act(async () => {
      component.setState({
        kudos: 10,
        description: "test guideline",
        editing: false,
      });
      await wrapper.update();

      findByTestId(wrapper, "submit-button").hostNodes().simulate("submit");

      await wait(0);
      await wrapper.update();

      expect(createMutationCalled).toBe(true);
    });
  });

  it("calls the update mutation if editing is set to true", async () => {
    const component: any = wrapper.find("EditGuideline").instance();

    await act(async () => {
      component.setState({
        editId: "2",
        editKudos: 5,
        editDescription: "guideline to be updated",
        editing: true,
      });
      await wrapper.update();

      findByTestId(wrapper, "submit-button").hostNodes().simulate("submit");

      await wait(0);
      await wrapper.update();

      expect(updateMutationCalled).toBe(true);
    });
  });

  it("handles input correctly", async () => {
    const component: any = wrapper.find("EditGuideline").instance();
    await act(async () => {
      expect(component.state.kudos).toBe("");
      expect(component.state.description).toBe("");

      simulateInputChange(wrapper, "kudo-input", "kudos", 10);
      simulateInputChange(
        wrapper,
        "description-input",
        "description",
        "Some guideline",
      );

      await wrapper.update();

      expect(component.state.kudos).toBe(10);
      expect(component.state.description).toBe("Some guideline");
    });
  });

  it("sets its state properly", async () => {
    const component: any = wrapper.find("EditGuideline").instance();
    await act(async () => {
      component.setEditState("2", "5", "guideline to be updated");

      await wrapper.update();

      expect(component.state.editing).toBe(true);
      expect(component.state.editId).toBe("2");
      expect(component.state.editDescription).toBe("guideline to be updated");
      expect(component.state.editKudos).toBe("5");
    });
  });

  it("shows a cancel button when editing", async () => {
    const component: any = wrapper.find("EditGuideline").instance();
    await act(async () => {
      component.setEditState("2", "5", "guideline to be updated");

      await wait(0);
      await wrapper.update();

      expect(wrapper.containsMatchingElement(<button>Cancel</button>)).toBe(
        true,
      );
    });
  });

  it("doesnt show a cancel button when not editing", async () => {
    await act(async () => {
      await wrapper.update();

      expect(wrapper.containsMatchingElement(<button>Cancel</button>)).toBe(
        false,
      );
    });
  });

  it("clears the edit state when pressing the cancel buttons", async () => {
    const component: any = wrapper.find("EditGuideline").instance();
    await act(async () => {
      component.setEditState("2", "5", "guideline to be updated");

      await wait(0);
      await wrapper.update();

      findByTestId(wrapper, "cancel-button").hostNodes().simulate("click");

      await wait(0);
      await wrapper.update();

      expect(component.state.editing).toBe(false);
    });
  });

  it("calls the refetch query", async () => {
    const component: any = wrapper.find("EditGuideline").instance();
    await act(async () => {
      component.setState({ kudos: 10, description: "test guideline" });
      await wrapper.update();

      findByTestId(wrapper, "submit-button").hostNodes().simulate("submit");

      await wait(0);
      await wrapper.update();

      await wait(0);
      await wrapper.update();

      expect(getGuidelinesCalled).toBe(true);
    });
  });
});
