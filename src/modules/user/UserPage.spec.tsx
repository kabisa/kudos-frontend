import { mount, ReactWrapper } from "enzyme";
import { createMemoryHistory, MemoryHistory } from "history";
import { act } from "react-dom/test-utils";
import { DISCONNECT_SLACK, GET_USER, UserPage } from "./UserPage";
import {
  findByTestId,
  mockLocalstorage,
  wait,
  withMockedProviders,
} from "../../spec_helper";
import { PATH_RESET_PASSWORD } from "../../routes";

let mutationCalled = false;
const mocks = [
  {
    request: {
      query: GET_USER,
    },
    result: () => ({
      data: {
        viewer: {
          name: "Max",
          avatar: "fakeAvatarUrl",
          slackId: "",
        },
      },
    }),
  },
];

const mocksWithSlackId = [
  {
    request: {
      query: GET_USER,
    },
    result: () => ({
      data: {
        viewer: {
          name: "Max",
          avatar: "fakeAvatarUrl",
          slackId: "1",
        },
      },
    }),
  },
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

let wrapper: ReactWrapper;
let history: MemoryHistory;

const setup = async (mock: any) => {
  history = createMemoryHistory();
  mutationCalled = false;
  mockLocalstorage("1");

  await act(async () => {
    wrapper = mount(withMockedProviders(<UserPage history={history} />, mock));
  });
};

describe.skip("<UserPage/>", () => {
  beforeEach(async () => {
    await setup(mocks);
  });

  it("shows the component is loading", () => {
    expect(findByTestId(wrapper, "loading").length).toBe(1);
  });

  it("shows the users name", async () => {
    await act(async () => {
      await wait(0);

      wrapper.update();

      expect(wrapper.containsMatchingElement(<h2>Max</h2>)).toBe(true);
    });
  });

  it("doesnt show an image when the query hasn't loaded", () => {
    expect(wrapper.containsMatchingElement(<img src="fakeAvatarUrl" />)).toBe(
      false,
    );
  });

  it("shows the users avatar", async () => {
    await act(async () => {
      await wait(0);

      wrapper.update();

      expect(wrapper.containsMatchingElement(<img src="fakeAvatarUrl" />)).toBe(
        true,
      );
    });
  });

  it("shows a link to gravatar", () => {
    expect(
      wrapper.containsMatchingElement(
        <a href="https://nl.grvaatar.com/">gravatar.com</a>,
      ),
    );
  });

  it("shows a link to the reset password page", () => {
    expect(wrapper.containsMatchingElement(<button>Change password</button>));
  });

  it("shows a logout button", () => {
    expect(wrapper.containsMatchingElement(<button>Log out</button>));
  });

  it("navigates to the reset password page", async () => {
    await act(async () => {
      const button = findByTestId(wrapper, "reset-password-btn").hostNodes();

      button.simulate("click", { button: 0 });

      wrapper.update();

      expect(history.location.pathname).toBe(PATH_RESET_PASSWORD);
    });
  });

  describe.skip("not connected to slack", () => {
    beforeEach(async () => {
      await setup(mocks);
    });

    it("shows the connect to slack part if the slack id is null", async () => {
      await act(async () => {
        await wait(0);
        await wrapper.update();

        expect(findByTestId(wrapper, "register-slack").hostNodes().length).toBe(
          1,
        );
      });
    });

    it("has the correct url for the connect button", async () => {
      await act(async () => {
        await wait(0);
        await wrapper.update();

        const btn = findByTestId(wrapper, "connect-slack-btn").hostNodes();

        expect(btn.prop("href")).toEqual(
          "http://localhost:3000/auth/slack/user/1",
        );
      });
    });
  });

  describe.skip("connected to slack", () => {
    beforeEach(async () => {
      await setup(mocksWithSlackId);
    });

    it("shows the user is connected to slack if the slack id is not null", async () => {
      await act(async () => {
        await wait(0);
        await wrapper.update();

        expect(
          findByTestId(wrapper, "slack-connected").hostNodes().length,
        ).toBe(1);
      });
    });

    it("calls the disconnect mutation", async () => {
      await act(async () => {
        await wait(0);
        await wrapper.update();

        findByTestId(wrapper, "disconnect-slack-btn")
          .hostNodes()
          .simulate("click");

        await wait(0);
        expect(mutationCalled).toBe(true);
      });
    });
  });
});
