import { mockLocalstorage, withMockedProviders } from "../../../../spec_helper";
import DropdownRemote from "./UserDropdown";
import { GET_USERS } from "../../queries";
import { render, screen, waitFor } from "@testing-library/react";
import {
  getSelectOptions,
  openSelect,
} from "../../../../support/testing/reactSelectHelpers";
import userEvent from "@testing-library/user-event";

export const mocksWithData = (teamId: string) => [
  {
    request: {
      query: GET_USERS,
      variables: { team_id: teamId },
    },
    result: {
      data: {
        teamById: {
          id: teamId,
          __typename: "Team",
          users: [
            {
              id: "1",
              name: "Max",
              virtualUser: false,
            },
            {
              id: "2",
              name: "Egon",
              virtualUser: false,
            },
            {
              id: "wrong-id-3",
              name: "Kabisa",
              virtualUser: true,
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
      query: GET_USERS,
      variables: { team_id: "1" },
    },
    error: new Error("It broke"),
  },
];

const mocksWithoutData = (teamId: string) => [
  {
    request: {
      query: GET_USERS,
      variables: { team_id: teamId },
    },
    result: {
      data: {
        teamById: {
          id: teamId,
          __typename: "Team",
          users: [],
        },
      },
    },
  },
];

const handleChangeMock = jest.fn();

const setup = (mocks: any) => {
  render(
    withMockedProviders(
      <DropdownRemote onChange={handleChangeMock} error={false} />,
      mocks,
    ),
  );
};

describe("<DropdownRemote />", () => {
  beforeEach(() => {
    mockLocalstorage("1");
  });

  it("shows when the users are loading", async () => {
    setup(mocksWithData("1"));
    const input = screen.getByRole("combobox", {
      description: "Receivers",
      hidden: true,
    });
    expect(input).toBeDisabled();
    openSelect(input);

    // Waiting for loading to finish before unmount
    await screen.findByRole("combobox", {
      description: "Receivers",
    });
  });

  it.skip("shows when there is an error", () => {
    setup(mocksWithError);
    const input = screen.getByRole("combobox", {
      description: "Receivers",
      hidden: true,
    });
    expect(input).toBeDisabled();
  });

  it("shows when there are no users", async () => {
    setup(mocksWithoutData("1"));
    const input = await screen.findByRole("combobox", {
      description: "Receivers",
    });
    openSelect(input);
    const options = getSelectOptions(input);
    expect(options).toHaveLength(0);
  });

  it("creates an option for each user", async () => {
    setup(mocksWithData("1"));
    const input = await screen.findByRole("combobox", {
      description: "Receivers",
    });
    openSelect(input);
    const options = getSelectOptions(input);
    expect(options).toHaveLength(3);
  });

  it("handles change correctly", async () => {
    setup(mocksWithData("1"));
    const input = await screen.findByRole("combobox", {
      description: "Receivers",
    });
    openSelect(input);
    const options = getSelectOptions(input);

    userEvent.click(options[1]);

    await waitFor(() => {
      expect(handleChangeMock).toBeCalledWith([{ label: "Egon", value: "2" }]);
    });
  });
});
