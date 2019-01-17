import { h, Component } from "preact";
import { Header, Icon, Divider, Button, Form } from "semantic-ui-react";
import gql from "graphql-tag";
import { toast } from "react-toastify";
import settings from "src/config/settings";
import { Mutation, Query } from "react-apollo";

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

export class GeneralSection extends Component {
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
        <Query
          query={GET_TEAM_NAME}
          variables={{
            id: localStorage.getItem(settings.TEAM_ID_TOKEN),
          }}
        >
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;
            return (
              <Mutation
                mutation={UPDATE_TEAM}
                onCompleted={() => {
                  toast.info("Team successfully updated!");
                }}
                refetchQueries={[
                  {
                    query: GET_TEAM_NAME,
                    variables: {
                      team_id: localStorage.getItem(settings.TEAM_ID_TOKEN),
                    },
                  },
                ]}
              >
                {(mutate, { loading }) => {
                  return (
                    <Form
                      onSubmit={() =>
                        mutate({
                          variables: {
                            name: this.state.name,
                            team_id: localStorage.getItem(
                              settings.TEAM_ID_TOKEN
                            ),
                          },
                        })
                      }
                    >
                      <Form.Input
                        fluid
                        label="Team name"
                        placeholder="Team name"
                        name="name"
                        required
                        value={this.state.name || data.teamById.name}
                        onChange={this.handleChange}
                      />
                      <Button
                        color="blue"
                        loading={loading}
                        disabled={loading}
                        type="submit"
                      >
                        Update
                      </Button>
                    </Form>
                  );
                }}
              </Mutation>
            );
          }}
        </Query>
      </div>
    );
  }
}
export default GeneralSection;
