import { mount, ReactWrapper } from "enzyme";
import { act } from "react-dom/test-utils";
import {
  findByText,
  fireEvent,
  render,
  RenderResult,
  screen,
  waitFor,
} from "@testing-library/react";
import {
  findByTestId,
  mockLocalstorage,
  wait,
  withMockedProviders,
} from "../../spec_helper";
import Desktop, { GET_USER } from "./Desktop";

const mocks = [
  {
    request: {
      query: GET_USER,
    },
    result: {
      data: {
        viewer: {
          id: "1",
          __typename: "Viewer",
          name: "Max",
        },
      },
    },
  },
];

describe("<Desktop />", () => {
  it("renders the users name", async () => {
    render(withMockedProviders(<Desktop />, mocks));
    const node = await screen.findByText("Max");
    expect(node).toBeInTheDocument();
  });

  it("should have a link to the home page", async () => {
    render(withMockedProviders(<Desktop />, mocks));

    const button = await screen.findByTestId("home-button");
    expect(button).toBeInTheDocument();
  });

  describe("profile menu", () => {
    let renderResult: RenderResult;

    beforeEach(async () => {
      renderResult = render(withMockedProviders(<Desktop />, mocks));
      const button = await screen.findByRole("button", { name: "Max" });
      button.click();
    });

    it("has a link to the profile page", async () => {
      const profileLink = await screen.findByTestId("profile-button");
      expect(profileLink).toBeInTheDocument();
    });

    it("has a switch team button", async () => {
      const switchTeamButton = await screen.findByTestId("switch-team-button");
      expect(switchTeamButton).toBeInTheDocument();
    });

    it("has a logout button", async () => {
      const logoutButton = await screen.findByTestId("logout-button");
      expect(logoutButton).toBeInTheDocument();
    });

    describe("as admin", () => {
      beforeEach(() => {
        mockLocalstorage("admin");
        renderResult.rerender(withMockedProviders(<Desktop />, mocks));
      });

      it("has a manage team button", async () => {
        const profileLink = screen.queryByTestId("manage-team-button");
        expect(profileLink).not.toBeNull();
      });
    });

    describe("as member", () => {
      beforeEach(() => {
        mockLocalstorage("member");
        renderResult.rerender(withMockedProviders(<Desktop />, mocks));
      });

      it("does not have a manage team button", async () => {
        const profileLink = screen.queryByTestId("manage-team-button");
        expect(profileLink).toBeNull();
      });
    });
  });
});
