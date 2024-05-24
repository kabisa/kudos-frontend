import { createMemoryHistory, MemoryHistory } from "history";
import { DISCONNECT_SLACK, GET_USER, UserPage } from "./UserPage";
import { mockLocalstorage, withMockedProviders } from "../../spec_helper";
import { PATH_RESET_PASSWORD } from "../../routes";
import {
  render,
  RenderResult,
  screen,
  waitFor,
  within,
} from "@testing-library/react";

let mutationCalled = false;
export const mocks = ({ slackId = "" } = { slackId: "" }) => [
  {
    request: {
      query: GET_USER,
    },
    result: () => ({
      data: {
        viewer: {
          id: "1",
          __typename: "User",
          name: "Max",
          avatar: "fakeAvatarUrl",
          slackId,
        },
      },
    }),
  },
];

const mocksWithSlackId = [
  ...mocks({ slackId: "1" }),
  {
    request: {
      query: DISCONNECT_SLACK,
    },
    result: () => {
      mutationCalled = true;
      return {
        data: {
          disconnectSlack: {
            user: {
              id: "1",
            },
          },
        },
      };
    },
  },
  {
    request: {
      query: GET_USER,
    },
    result: () => ({
      data: {
        viewer: {
          name: "Max",
          avatar: "fakeAvatarUrl",
          slackId: null,
        },
      },
    }),
  },
];

let history: MemoryHistory;
let renderResult: RenderResult | null = null;
const setup = async (mock: any) => {
  if (renderResult) {
    await waitFor(() => {
      expect(screen.queryByText("Loading...")).toBeNull();
    });

    renderResult.unmount();
  }

  history = createMemoryHistory();
  mutationCalled = false;
  mockLocalstorage("1");

  renderResult = render(
    withMockedProviders(<UserPage history={history} />, mock),
  );
};

describe("<UserPage/>", () => {
  const original = window;
  beforeEach(async () => {
    window = Object.create(window);
    const url = "http://dummy.com";
    Object.defineProperty(window, "location", {
      value: {
        href: url,
      },
      writable: true, // possibility to override
    });

    await setup(mocks());
  });

  afterEach(() => {
    window = original;
  });

  it("shows the component is loading", async () => {
    const loading = screen.getByText("Loading...");
    expect(loading).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).toBeNull();
    });
  });

  it("shows the users name", async () => {
    const name = await screen.findByRole("heading", { level: 2, name: "Max" });
    expect(name).toBeInTheDocument();
  });

  it("shows the users avatar", async () => {
    const image = (await screen.findAllByRole("img"))[0];

    expect(image.getAttribute("src")).toEqual("fakeAvatarUrl");
  });

  it("shows a link to gravatar", async () => {
    const link = await screen.findByRole("link", { name: "gravatar.com" });
    expect(link.getAttribute("href")).toEqual("https://nl.gravatar.com/");
  });

  it("shows a link to the reset password page", async () => {
    const resetPasswordButton = await screen.findByRole("button", {
      name: "Change password",
    });
    expect(resetPasswordButton).toBeInTheDocument();
  });

  it("shows a logout button", async () => {
    const resetPasswordButton = await screen.findByRole("button", {
      name: "Log out",
    });
    expect(resetPasswordButton).toBeInTheDocument();
  });

  it("navigates to the reset password page", async () => {
    const resetPasswordButton = await screen.findByRole("button", {
      name: "Change password",
    });
    resetPasswordButton.click();

    await waitFor(() => {
      expect(history.location.pathname).toBe(PATH_RESET_PASSWORD);
    });
  });

  describe("not connected to slack", () => {
    beforeEach(async () => {
      await setup(mocks());
    });

    it("shows the connect to slack part if the slack id is null", async () => {
      const connectPart = await screen.findByTestId("register-slack");
      expect(connectPart).toBeInTheDocument();
    });

    it("has the correct url for the connect button", async () => {
      const connectPart = await screen.findByTestId("register-slack");
      expect(connectPart).toBeInTheDocument();

      const button = within(connectPart).getByRole("button", {
        // The alt text of the image is also counting toward the button name
        name: "Connect account Connect account",
      });
      button.click();
      expect(button).toBeInTheDocument();

      expect(window.location.href).toEqual(
        "http://localhost:3000/auth/slack/user/1",
      );
    });
  });

  describe("connected to slack", () => {
    beforeEach(async () => {
      await setup(mocksWithSlackId);
    });

    it("shows the user is connected to slack if the slack id is not null", async () => {
      const connectedPart = await screen.findByTestId("slack-connected");
      expect(connectedPart).toBeInTheDocument();
    });

    it("calls the disconnect mutation", async () => {
      const connectedPart = await screen.findByTestId("slack-connected");

      within(connectedPart).getByRole("button").click();
      await waitFor(() => {
        expect(mutationCalled).toBe(true);
      });
    });
  });
});
