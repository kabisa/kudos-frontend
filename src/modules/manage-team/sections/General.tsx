/* eslint-disable no-shadow */
import React, { ChangeEvent, Component } from 'react';
import {
  Button, Divider, Form, Header, Icon,
} from 'semantic-ui-react';
import gql from 'graphql-tag';
import { toast } from 'react-toastify';
import { Query, Mutation } from '@apollo/react-components';
import settings from '../../../config/settings';

export const GET_TEAM_NAME = gql`
    query GetTeamName($id: ID!) {
        teamById(id: $id) {
            name
        }
    }
`;

export const UPDATE_TEAM = gql`
    mutation UpdateTeam($name: String!, $team_id: ID!) {
        updateTeam(name: $name, teamId: $team_id) {
            team {
                id
            }
        }
    }
`;

export interface GetTeamNameResult {
  teamById: {
    name: string;
  };
}

export interface UpdateTeamParameters {
  name: string;
  team_id: number;
}

export interface UpdateTeamResult {
  team: {
    id: string;
  };
}

export interface Props {}

export interface State {
  name: string;
}

export default class GeneralSection extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: '',
    };

    this.updateTeam = this.updateTeam.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e: ChangeEvent, { name, value }: any) {
    // @ts-ignore
    this.setState({ [name]: value });
  }

  updateTeam(mutate: any) {
    mutate({
      variables: {
        name: this.state.name,
        team_id: localStorage.getItem(settings.TEAM_ID_TOKEN),
      },
      refetchQueries: [
        {
          query: GET_TEAM_NAME,
          variables: {
            id: localStorage.getItem(settings.TEAM_ID_TOKEN),
          },
        },
      ],
    });
  }

  render() {
    return (
      <div>
        <Header as="h2">
          <Icon name="settings" />
          <Header.Content>
            General
            <Header.Subheader>Manage your team settings</Header.Subheader>
          </Header.Content>
        </Header>
        <Divider />
        <Query<GetTeamNameResult>
          query={GET_TEAM_NAME}
          variables={{
            id: localStorage.getItem(settings.TEAM_ID_TOKEN),
          }}
        >
          {({
            loading, error, data, refetch,
          }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error! {error.message}</p>;

            return (
              <Mutation<UpdateTeamResult, UpdateTeamParameters>
                mutation={UPDATE_TEAM}
                onCompleted={() => {
                  toast.info('Team successfully updated!');
                  this.setState({ name: '' });
                  refetch();
                }}
              >
                {(mutate, { loading }) => (
                  <div>
                    <h1>{(data && data.teamById)
                      ? data.teamById.name
                      : '-'}
                    </h1>
                    <Form onSubmit={() => this.updateTeam(mutate)}>
                      <Form.Input
                        data-testid="name-input"
                        fluid
                        label="New team name"
                        placeholder="Team name"
                        name="name"
                        required
                        value={this.state.name}
                        onChange={this.handleChange}
                      />
                      <Button
                        data-testid="submit-button"
                        color="blue"
                        loading={loading}
                        disabled={loading}
                        type="submit"
                      >
                        Update
                      </Button>
                    </Form>
                  </div>
                )}
              </Mutation>
            );
          }}
        </Query>
      </div>
    );
  }
}
