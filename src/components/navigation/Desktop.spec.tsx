import { screen } from "@testing-library/react";
import { mockLocalstorage } from "../../spec_helper";
import Desktop, { GET_USER } from "./Desktop";
import { setComponent } from "../../support/testing/testComponent";
import {
  applicationContext,
  routingContext,
} from "../../support/testing/testContexts";

export const mocks = () => [
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
  const { setProps, renderComponent } = setComponent(
    Desktop,
    applicationContext(mocks()),
    routingContext(),
  );
  setProps({});

  it("renders the users name", async () => {
    renderComponent();

    const node = await screen.findByText("Max");
    expect(node).toBeInTheDocument();
  });

  it("should have a link to the home page", async () => {
    renderComponent();

    const button = await screen.findByTestId("home-button");
    expect(button).toBeInTheDocument();
  });

  describe("profile menu", () => {
    beforeEach(async () => {
      renderComponent();

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
      beforeEach(async () => {
        mockLocalstorage("admin");
        renderComponent();
        await screen.findByText("Max");
      });

      it("has a manage team button", () => {
        const profileLink = screen.findByTestId("manage-team-button");
        expect(profileLink).not.toBeNull();
      });
    });

    describe("as member", () => {
      beforeEach(async () => {
        mockLocalstorage("member");
        renderComponent();
        await screen.findByText("Max");
      });

      it("does not have a manage team button", () => {
        const profileLink = screen.queryByTestId("manage-team-button");
        expect(profileLink).toBeNull();
      });
    });
  });
});
