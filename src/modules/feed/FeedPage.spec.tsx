import { mockLocalstorage } from "../../spec_helper";
import { FeedPage } from "./index";
import { screen } from "@testing-library/react";
import { mocks as repoMocks } from "../../components/organisms/RepoList/RepoList.spec";
import { mocksWithData as teamMemberMocks } from "./components/UserDropdown/UserDropdown.spec";
import { mocks as guidelineMocks } from "../manage-team/sections/guideline/GuidelinesSection.spec";
import { mocks as userMock } from "../../components/navigation/Desktop.spec";
import { mocks as goalMocks } from "../statistics/Statistics.spec";
import { setComponent } from "../../support/testing/testComponent";
import {
  applicationContext,
  responsiveContext,
} from "../../support/testing/testContexts";

type MockRequest = { request: unknown; result: unknown };

describe("<FeedPage />", () => {
  const teamId = "1";

  const { setProps, renderComponent } = setComponent(
    FeedPage,
    responsiveContext,
    applicationContext(
      ([] as MockRequest[])
        .concat(userMock())
        .concat(repoMocks(false))
        .concat(goalMocks(teamId))
        .concat(teamMemberMocks(teamId))
        .concat(guidelineMocks(teamId)),
    ),
  );
  setProps({});

  beforeEach(() => {
    mockLocalstorage("1");

    renderComponent();
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
