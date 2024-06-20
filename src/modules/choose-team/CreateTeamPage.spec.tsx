import { GraphQLError } from "graphql";
import CreateTeamPage, { MUTATION_CREATE_TEAM } from "./CreateTeamPage";
import { Storage } from "../../support/storage";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { setComponent } from "../../support/testing/testComponent";
import {
  applicationContext,
  routingContext,
} from "../../support/testing/testContexts";

let mutationCalled = false;
const mocks = [
  {
    request: {
      query: MUTATION_CREATE_TEAM,
      variables: { name: "Kabisa" },
    },
    result: () => {
      mutationCalled = true;
      return { data: { createTeam: { team: { id: "1" } } } };
    },
  },
];

const mocksWithError = [
  {
    request: {
      query: MUTATION_CREATE_TEAM,
      variables: { name: "Kabisa" },
    },
    result: {
      errors: [new GraphQLError("It broke")],
    },
  },
];

describe("<CreateTeamPage />", () => {
  const { renderComponent, setProps, updateDecorator } = setComponent(
    CreateTeamPage,
    applicationContext(mocks),
    routingContext(),
  );

  setProps({});

  beforeEach(() => {
    mutationCalled = false;
    Storage.setItem = jest.fn();
  });

  it("renders a name field", () => {
    renderComponent();

    const input = screen.getByPlaceholderText("Team name");

    expect(input).toBeInTheDocument();
  });

  it("renders the create team button", () => {
    renderComponent();

    expect(
      screen.getByRole("button", { name: "Create team" }),
    ).toBeInTheDocument();
  });

  it("handles input correctly", () => {
    renderComponent();

    const input = screen.getByPlaceholderText("Team name");
    expect(input).toHaveValue("");

    fireEvent.change(input, { target: { value: "Kabisa" } });

    expect(input).toHaveValue("Kabisa");
  });

  it("returns an error if the name is null", () => {
    renderComponent();

    const button = screen.getByRole("button", { name: "Create team" });
    button.click();

    expect(screen.queryByText("Name can't be blank."));
  });

  it("disables the button during creation", async () => {
    renderComponent();

    const input = screen.getByPlaceholderText("Team name");
    const button = screen.getByRole("button", { name: "Create team" });

    fireEvent.change(input, { target: { value: "Kabisa" } });
    button.click();

    await waitFor(() => expect(button).toBeDisabled());
  });

  it("shows when there is an error", async () => {
    updateDecorator("application", { mocks: mocksWithError });
    renderComponent();

    const button = screen.getByRole("button", { name: "Create team" });

    const input = screen.getByPlaceholderText("Team name");
    fireEvent.change(input, { target: { value: "Kabisa" } });

    button.click();

    expect(await screen.findByText("It broke")).not.toBeNull();
  });

  it("calls the mutation if the name is not null", async () => {
    renderComponent();

    const input = screen.getByPlaceholderText("Team name");
    const button = screen.getByRole("button", { name: "Create team" });

    fireEvent.change(input, { target: { value: "Kabisa" } });
    button.click();

    await waitFor(() => expect(mutationCalled).toBe(true));
  });

  it("sets the team id in local storage if the mutation is successful", async () => {
    renderComponent();

    const input = screen.getByPlaceholderText("Team name");
    const button = screen.getByRole("button", { name: "Create team" });

    fireEvent.change(input, { target: { value: "Kabisa" } });
    button.click();

    await waitFor(() =>
      expect(Storage.setItem).toHaveBeenCalledWith("team_id", "1"),
    );
  });
});
