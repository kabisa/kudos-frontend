import { mockLocalstorage, withMockedProviders } from "../../../../spec_helper";
import { DELETE_GUIDELINE, Guideline } from "./Guideline";
import { GET_GUIDELINES } from "./GuidelinesSection";
import { render, screen, waitFor } from "@testing-library/react";

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

  beforeEach(() => {
    mockLocalstorage("1");
    global.confirm = jest.fn(() => true);
    render(
      withMockedProviders(
        <table>
          <tbody>
            <Guideline
              key={guideline.key}
              name={guideline.name}
              id={guideline.id}
              kudos={guideline.kudos}
              editGuideline={editGuidelineMock}
            />
          </tbody>
        </table>,
        mocks,
      ),
    );
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

    expect(editGuidelineMock).toBeCalledTimes(1);
    expect(editGuidelineMock).toHaveBeenCalledWith(
      guideline.id,
      guideline.kudos,
      guideline.name,
    );
  });

  it("has a confirm button for the delete action", async () => {
    expect(global.confirm).toBeCalledTimes(0);

    const deleteButton = screen.getByRole("button", { name: "delete" });
    deleteButton.click();

    expect(global.confirm).toBeCalledTimes(1);
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
});
