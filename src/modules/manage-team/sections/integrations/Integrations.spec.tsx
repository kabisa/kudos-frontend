import { createMemoryHistory, History } from "history";
import { act } from "react-dom/test-utils";
import {
  findByTestId,
  mockLocalstorage,
  wait,
  withMockedProviders,
} from "../../../../spec_helper";
import IntegrationsSection, {
  GET_TEAM_INTEGRATIONS,
  REMOVE_SLACK,
} from "./Integrations";
import { render, screen, waitFor } from "@testing-library/react";

let mutationCalled = false;
const mocksWithoutSlack = [
  {
    request: {
      query: GET_TEAM_INTEGRATIONS,
      variables: { id: "1" },
    },
    result: {
      data: {
        teamById: {
          slackTeamId: "",
        },
      },
    },
  },
];

const mocksWitSlack = [
  {
    request: {
      query: GET_TEAM_INTEGRATIONS,
      variables: { id: "1" },
    },
    result: {
      data: {
        teamById: {
          slackTeamId: "someId",
        },
      },
    },
  },
  {
    request: {
      query: REMOVE_SLACK,
      variables: { teamId: "1" },
    },
    result: () => {
      mutationCalled = true;
      return {
        data: {
          removeSlack: {
            team: {
              id: "1",
            },
          },
        },
      };
    },
  },
  {
    request: {
      query: GET_TEAM_INTEGRATIONS,
      variables: { id: "1" },
    },
    result: {
      data: {
        teamById: {
          slackTeamId: "someId",
        },
      },
    },
  },
];

const mocksWithError = [
  {
    request: {
      query: GET_TEAM_INTEGRATIONS,
      variables: { id: "1" },
    },
    error: new Error("something went wrong"),
  },
];

let history: History;
const setup = (mocks: any) => {
  history = createMemoryHistory();
  mutationCalled = false;
  render(withMockedProviders(<IntegrationsSection history={history} />, mocks));
};

describe("<IntegrationsSection />", () => {
  beforeEach(() => {
    mockLocalstorage("1");
  });

  it("shows when the query is loading", async () => {
    setup(mocksWithoutSlack);
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).toBeNull();
    });
  });

  it("shows when there is an error", async () => {
    setup(mocksWithError);
    const errorMessage = await screen.findByText("something went wrong");
    expect(errorMessage).toBeInTheDocument();
  });

  describe("not connected to Slack", () => {
    beforeEach(() => {
      setup(mocksWithoutSlack);
    });

    it("shows the slack disconnected container", async () => {
      await waitFor(() => {
        expect(screen.queryByText("Loading...")).toBeNull();
      });

      const slackHeader = await screen.findByRole("heading", {
        name: "Slack integration",
        level: 4,
      });

      expect(slackHeader).toBeInTheDocument();

      const slackConnect = await screen.findByRole("img", {
        name: "Add to Slack",
      });
      expect(slackConnect).toBeInTheDocument();
    });

    it("redirects to the correct url", async () => {
      await waitFor(() => {
        expect(screen.queryByText("Loading...")).toBeNull();
      });

      const slackConnect = await screen.findByRole("link", {
        name: "Add to Slack",
      });

      expect(slackConnect.getAttribute("href")).toEqual(
        "http://localhost:3000/auth/slack/team/1",
      );
    });
  });

  describe("connected to slack", () => {
    beforeEach(() => {
      setup(mocksWitSlack);
    });

    it("shows the connected to slack container", async () => {
      await waitFor(() => {
        expect(screen.queryByText("Loading...")).toBeNull();
      });
      const slackHeader = await screen.findByRole("heading", {
        name: "Slack integration",
        level: 4,
      });
      expect(slackHeader).toBeInTheDocument();

      const slackDisconnect = await screen.findByRole("button", {
        name: "Remove Slack",
      });
      expect(slackDisconnect).toBeInTheDocument();
    });

    it("calls the disconnect mutation", async () => {
      await waitFor(() => {
        expect(screen.queryByText("Loading...")).toBeNull();
      });
      const slackDisconnect = await screen.findByRole("button", {
        name: "Remove Slack",
      });
      slackDisconnect.click();
      await waitFor(() => {
        expect(mutationCalled).toBe(true);
      });
    });
  });
});
