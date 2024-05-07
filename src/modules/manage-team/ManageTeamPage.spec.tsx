import { mount, ReactWrapper } from "enzyme";
import { act } from "react-dom/test-utils";
import { createMemoryHistory, MemoryHistory } from "history";
import { findByTestId, withMockedProviders } from "../../spec_helper";
import { ManageTeamPage } from "./ManageTeamPage";

describe("<ManageTeamPage/>", () => {
  let wrapper: ReactWrapper;
  let history: MemoryHistory;

  beforeEach(async () => {
    history = createMemoryHistory();

    await act(async () => {
      wrapper = mount(
        withMockedProviders(<ManageTeamPage history={history} />),
      );
    });
  });

  it("navigates to the general section", async () => {
    await act(async () => {
      findByTestId(wrapper, "general-button").hostNodes().simulate("click");

      expect(history.location.pathname).toBe("/general");
    });
  });

  it("navigates to the invites section", async () => {
    await act(async () => {
      findByTestId(wrapper, "invites-button").hostNodes().simulate("click");

      expect(history.location.pathname).toBe("/invites");
    });
  });

  it("navigates to the guidelines section", async () => {
    await act(async () => {
      findByTestId(wrapper, "guidelines-button").hostNodes().simulate("click");

      expect(history.location.pathname).toBe("/guidelines");
    });
  });

  it("navigates to the members section", async () => {
    await act(async () => {
      findByTestId(wrapper, "members-button").hostNodes().simulate("click");

      expect(history.location.pathname).toBe("/members");
    });
  });

  it("navigates to the kudometer section", async () => {
    await act(async () => {
      findByTestId(wrapper, "kudometers-button").hostNodes().simulate("click");

      expect(history.location.pathname).toBe("/kudometers");
    });
  });

  it("navigates to the integrations section", async () => {
    await act(async () => {
      findByTestId(wrapper, "integrations-button")
        .hostNodes()
        .simulate("click");

      expect(history.location.pathname).toBe("/integrations");
    });
  });
});
