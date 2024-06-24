import { MockedFunction, mockLocalstorage } from "../../../../spec_helper";
import { setTestSubject } from "../../../../support/testing/testSubject";
import {
  dataDecorator,
  tableDecorator,
} from "../../../../support/testing/testDecorators";
import { DELETE_GUIDELINE, Guideline } from "./Guideline";
import { GET_GUIDELINES } from "./GuidelinesSection";
import { screen, waitFor } from "@testing-library/react";

let mutationCalled = false;
let getGuidelinesCalled = false;
const mocks = [
  {
    request: {
      query: DELETE_GUIDELINE,
      variables: {
        id: 1,
      },
    },
    result: () => {
      mutationCalled = true;
      return {
        data: {
          deleteGuideline: {
            guidelineId: "1",
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

const guideline = {
  key: 1,
  id: 1,
  name: "Some guideline",
  kudos: 5,
};

describe("<Guideline />", () => {
  const editGuidelineMock = jest.fn();

  const { renderComponent } = setTestSubject(Guideline, {
    decorators: [tableDecorator, dataDecorator(mocks)],
    props: {
      key: guideline.key,
      name: guideline.name,
      id: guideline.id,
      kudos: guideline.kudos,
      editGuideline: editGuidelineMock,
    },
  });

  beforeEach(() => {
    mockLocalstorage("1");
    global.confirm = jest.fn(() => true);
    renderComponent();
  });

  it("renders the guideline name", () => {
    expect(
      screen.getByRole("cell", { name: guideline.name }),
    ).toBeInTheDocument();
  });

  it("renders the guideline amount", () => {
    expect(
      screen.getByRole("cell", { name: `${guideline.kudos}` }),
    ).toBeInTheDocument();
  });

  it("calls the edit guideline function", () => {
    const editButton = screen.getByRole("button", { name: "edit" });
    editButton.click();

    expect(editGuidelineMock).toHaveBeenCalledTimes(1);
    expect(editGuidelineMock).toHaveBeenCalledWith(
      guideline.id,
      guideline.kudos,
      guideline.name,
    );
  });

  it("has a confirm button for the delete action", () => {
    expect(global.confirm).toHaveBeenCalledTimes(0);

    const deleteButton = screen.getByRole("button", { name: "delete" });
    deleteButton.click();

    expect(global.confirm).toHaveBeenCalledTimes(1);
  });

  it("calls the delete mutation", async () => {
    const deleteButton = screen.getByRole("button", { name: "delete" });
    deleteButton.click();

    await waitFor(() => expect(mutationCalled).toBe(true));
  });

  it("refetches the guidelines after the deletion", async () => {
    const deleteButton = screen.getByRole("button", { name: "delete" });
    deleteButton.click();

    await waitFor(() => expect(getGuidelinesCalled).toBe(true));
  });

  it("does not the delete mutation if confirm is cancelled", async () => {
    (global.confirm as MockedFunction<Window["confirm"]>).mockReturnValueOnce(
      true,
    );
    const deleteButton = screen.getByRole("button", { name: "delete" });
    deleteButton.click();

    await waitFor(() => expect(mutationCalled).toBe(true));
  });
});
