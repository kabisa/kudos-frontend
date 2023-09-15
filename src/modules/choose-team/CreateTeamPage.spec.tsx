import { GraphQLError } from 'graphql';
import {
  withMockedProviders,
} from '../../spec_helper';
import CreateTeamPage, { MUTATION_CREATE_TEAM } from './CreateTeamPage';
import { Storage } from '../../support/storage';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

let mutationCalled = false;
const mocks = [
  {
    request: {
      query: MUTATION_CREATE_TEAM,
      variables: { name: 'Kabisa' },
    },
    result: () => {
      mutationCalled = true;
      return { data: { createTeam: { team: { id: '1' } } } };
    },
  },
];

const mocksWithError = [
  {
    request: {
      query: MUTATION_CREATE_TEAM,
      variables: { name: 'Kabisa' },
    },
    result: {
      errors: [new GraphQLError('It broke')],
    },
  },
];

describe('<CreateTeamPage />', () => {
  beforeEach(async () => {
    mutationCalled = false;
    Storage.setItem = jest.fn();
  });

  it('renders a name field', () => {
    render(
      withMockedProviders(<CreateTeamPage />, mocks)
    );
    const input = screen.getByPlaceholderText("Team name");

    expect(input).toBeInTheDocument();
  });

  it('renders the create team button', () => {
    render(
      withMockedProviders(<CreateTeamPage />, mocks)
    );

    expect(screen.getByRole("button", { name: "Create team" })).toBeInTheDocument();
  });

  it('handles input correctly', async () => {
    render(
      withMockedProviders(<CreateTeamPage />, mocks)
    );
    const input = screen.getByPlaceholderText("Team name");
    expect(input).toHaveValue("");

    fireEvent.change(input, { target: { value: "Kabisa" }});

    expect(input).toHaveValue("Kabisa");
  });

  it('returns an error if the name is null', async () => {
    render(
      withMockedProviders(<CreateTeamPage />, mocks)
    );
    const button = screen.getByRole("button", { name: "Create team" });

    userEvent.click(button);

    expect(screen.queryByText("Name can't be blank."));
  });

  it('Sets the loading state', async () => {
    const { container } = render(
      withMockedProviders(<CreateTeamPage />, mocks)
    );
    const input = screen.getByPlaceholderText("Team name");
    const button = screen.getByRole("button", { name: "Create team" });

    fireEvent.change(input, { target: { value: "Kabisa" }});
    userEvent.click(button);

    await waitFor(() => expect(container.getElementsByClassName("loading").length).toBe(1));
  });

  it('shows when there is an error', async () => {
    render(
      withMockedProviders(<CreateTeamPage />, mocksWithError)
    );
    const button = screen.getByRole("button", { name: "Create team" });

    userEvent.click(button);

    expect(screen.queryByText("It broke"));
  });

  it('calls the mutation if the name is not null', async () => {
    render(
      withMockedProviders(<CreateTeamPage />, mocks)
    );
    const input = screen.getByPlaceholderText("Team name");
    const button = screen.getByRole("button", { name: "Create team" });

    fireEvent.change(input, { target: { value: "Kabisa" }});
    userEvent.click(button);

    await waitFor(() => expect(mutationCalled).toBe(true));
  });

  it('sets the team id in local storage if the mutation is successful', async () => {
    render(
      withMockedProviders(<CreateTeamPage />, mocks)
    );
    const input = screen.getByPlaceholderText("Team name");
    const button = screen.getByRole("button", { name: "Create team" });

    fireEvent.change(input, { target: { value: "Kabisa" }});
    userEvent.click(button);

    await waitFor(() => expect(Storage.setItem).toBeCalledWith('team_id', '1'));
  });
});
