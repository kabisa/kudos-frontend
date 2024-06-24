import { mockLocalstorage } from "../../../../spec_helper";
import {
  makeFC,
  setTestSubject,
} from "../../../../support/testing/testSubject";
import { dataDecorator } from "../../../../support/testing/testDecorators";
import { EditGuideline } from "./EditGuideline";
import {
  CREATE_GUIDELINE,
  GET_GUIDELINES,
  UPDATE_GUIDELINE,
} from "./GuidelinesSection";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { createRef } from "react";

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
        guideline: 2,
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
            id: "1",
            __typename: "Team",
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

describe("<EditGuideline/>", () => {
  const { renderComponent, updateProps } = setTestSubject(
    makeFC(EditGuideline),
    {
      decorators: [dataDecorator(mocks)],
      props: {},
    },
  );

  beforeEach(() => {
    mockLocalstorage("1");
    updateMutationCalled = false;
    createMutationCalled = false;
    getGuidelinesCalled = false;
  });

  it("calls the create mutation if editing is set to false", async () => {
    renderComponent();

    const amountKudoInput = screen.getByLabelText("Amount of kudos");
    fireEvent.change(amountKudoInput, { target: { value: "10" } });

    const descriptionInput = screen.getByLabelText("Description");
    fireEvent.change(descriptionInput, { target: { value: "test guideline" } });

    const submitButton = screen.getByRole("button", {
      name: "Create guideline",
    });
    submitButton.click();

    await waitFor(() => expect(createMutationCalled).toBe(true));
  });

  it("calls the update mutation if editing is set to true", async () => {
    const componentRef = createRef<EditGuideline>();
    updateProps({ ref: componentRef });
    renderComponent();

    componentRef.current?.setEditState(2, "10", "test guideline");

    const amountKudoInput = screen.getByLabelText("Amount of kudos");
    fireEvent.change(amountKudoInput, { target: { value: "5" } });

    const descriptionInput = screen.getByLabelText("Description");
    fireEvent.change(descriptionInput, {
      target: { value: "guideline to be updated" },
    });

    const submitButton = screen.getByRole("button", {
      name: "Update guideline",
    });
    submitButton.click();

    await waitFor(() => expect(updateMutationCalled).toBe(true));
    await waitFor(() => expect(getGuidelinesCalled).toBe(true));
  });

  it("shows a cancel button when editing", () => {
    const componentRef = createRef<EditGuideline>();
    updateProps({ ref: componentRef });
    renderComponent();

    componentRef.current?.setEditState(2, "10", "test guideline");

    const cancelButton = screen.getByRole("button", {
      name: "Cancel",
    });
    expect(cancelButton).toBeInTheDocument();
  });

  it("does not show a cancel button when not editing", () => {
    renderComponent();

    const cancelButton = screen.queryByRole("button", {
      name: "Cancel",
    });
    expect(cancelButton).toBeNull();
  });

  it("clears the edit state when pressing the cancel buttons", () => {
    const componentRef = createRef<EditGuideline>();
    updateProps({ ref: componentRef });
    renderComponent();

    componentRef.current?.setEditState(2, "10", "test guideline");

    const amountKudoInput = screen.getByRole("spinbutton", {
      name: "Amount of kudos",
    });
    fireEvent.change(amountKudoInput, { target: { value: "5" } });

    const descriptionInput = screen.getByRole("textbox", {
      name: "Description",
    });
    fireEvent.change(descriptionInput, {
      target: { value: "guideline to be updated" },
    });

    const cancelButton = screen.getByRole("button", {
      name: "Cancel",
    });
    cancelButton.click();

    const updatedButton = screen.queryByRole("button", {
      name: "Cancel",
    });
    expect(updatedButton).toBeNull();

    /**
     * This actually only closes 'the editing mode' the values are not
     * reset...
     */
  });
});
