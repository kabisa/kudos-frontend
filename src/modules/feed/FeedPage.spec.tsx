import { Context as ResponsiveContext } from "react-responsive";
import { mockLocalstorage, withMockedProviders } from "../../spec_helper";
import { FeedPage } from "./index";
import { render, screen } from "@testing-library/react";
import { mocks as repoMocks } from "../../components/organisms/RepoList/RepoList.spec";
import { mocksWithData as teamMemberMocks } from "./components/UserDropdown/UserDropdown.spec";
import { mocks as guidelineMocks } from "../manage-team/sections/guideline/GuidelinesSection.spec";
import { mocks as userMock } from "../../components/navigation/Desktop.spec";
import { mocks as goalMocks } from "../statistics/Statistics.spec";

type MockRequest = { request: unknown; result: unknown };

const setup = (teamId: string) => {
  render(
    withMockedProviders(
      // Because the component is wrapped with react-responsive components we need
      // to provide a mock value for the browser width.
      <ResponsiveContext.Provider value={{ width: 1200 }}>
        <FeedPage />
      </ResponsiveContext.Provider>,
      ([] as MockRequest[])
        .concat(userMock())
        .concat(repoMocks(false))
        .concat(goalMocks(teamId))
        .concat(teamMemberMocks(teamId))
        .concat(guidelineMocks(teamId)),
    ),
  );
};

describe("<FeedPage />", () => {
  beforeEach(async () => {
    mockLocalstorage("1");

    setup("1");
  });

  it("shows a create post section", async () => {
    const createPost = await screen.findByRole("button", {
      name: "DROP YOUR KUDOS HERE",
    });
    expect(createPost).toBeInTheDocument();
  });

  it("shows a right rail", async () => {
    const rightRail = await screen.findByTestId("right-rail");
    expect(rightRail).toBeInTheDocument();
  });

  it("shows a repo list", async () => {
    const repoList = await screen.findByTestId("repo-list");
    expect(repoList).toBeInTheDocument();
  });
});
