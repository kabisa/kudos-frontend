import { h, Component } from "preact";
import {
  Header,
  Icon,
  Divider,
  Table,
  Message,
  Button,
  Form,
} from "semantic-ui-react";
import gql from "graphql-tag";
import { toast } from "react-toastify";
import { Mutation, Query } from "react-apollo";
import settings from "src/config/settings";
import { getGraphqlError } from "src/support";

export const DELETE_GUIDELINE = gql`
  mutation DeleteGuideline($id: ID!) {
    deleteGuideline(guidelineId: $id) {
      guidelineId
    }
  }
`;

export const CREATE_GUIDELINE = gql`
  mutation CreateGuideline($name: String!, $kudos: Int!, $team_id: ID!) {
    createGuideline(name: $name, kudos: $kudos, teamId: $team_id) {
      guideline {
        id
      }
    }
  }
`;

export const GET_GUIDELINES = gql`
  query Guidelines($team_id: ID!) {
    teamById(id: $team_id) {
      guidelines {
        id
        kudos
        name
      }
    }
  }
`;

export class GuidelineSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      kudos: null,
      description: "",
      error: null,
    };
    this.initialState = this.state;

    this.handleChange = this.handleChange.bind(this);
    this.createGuideline = this.createGuideline.bind(this);
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  createGuideline(mutate) {
    this.setState({ error: null });
    mutate({
      variables: {
        name: this.state.description,
        kudos: parseFloat(this.state.kudos),
        team_id: localStorage.getItem(settings.TEAM_ID_TOKEN),
      },
    });
  }

  render() {
    return (
      <div>
        <Header as="h2">
          <Icon name="settings" />
          <Header.Content>
            Guidelines
            <Header.Subheader>Manage guidelines</Header.Subheader>
          </Header.Content>
        </Header>
        <Divider />
        <Mutation
          mutation={CREATE_GUIDELINE}
          onCompleted={() => {
            this.setState(this.initialState);
            toast.info("Guideline created successfully!");
          }}
          refetchQueries={[
            {
              query: GET_GUIDELINES,
              variables: {
                team_id: localStorage.getItem(settings.TEAM_ID_TOKEN),
              },
            },
          ]}
        >
          {(createGuideline, { error, loading }) => {
            let displayError;
            if (error) {
              displayError = getGraphqlError(error);
            }
            if (this.state.error) {
              displayError = this.state.error;
            }
            return (
              <Form onSubmit={() => this.createGuideline(createGuideline)}>
                <Form.Group widths="equal">
                  <Form.Input
                    fluid
                    label="Amount of kudos"
                    placeholder="Kudos"
                    type="number"
                    min="1"
                    max="1000"
                    name="kudos"
                    required
                    value={this.state.kudos}
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    fluid
                    required
                    label="Description"
                    name="description"
                    placeholder="Description"
                    value={this.state.description}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Button
                  color="blue"
                  loading={loading}
                  disabled={loading}
                  type="submit"
                >
                  Create guideline
                </Button>
                {displayError && (
                  <Message negative>
                    <Message.Header>Unable to create guideline.</Message.Header>
                    <p>{displayError}</p>
                  </Message>
                )}
              </Form>
            );
          }}
        </Mutation>
        <Divider />
        <Query
          query={GET_GUIDELINES}
          variables={{ team_id: localStorage.getItem(settings.TEAM_ID_TOKEN) }}
        >
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;
            return (
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Kudos</Table.HeaderCell>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {data.teamById.guidelines.map(item => {
                    return (
                      <Table.Row key={item.id}>
                        <Table.Cell>{item.kudos}</Table.Cell>
                        <Table.Cell>{item.name}</Table.Cell>
                        <Table.Cell>
                          <Mutation
                            mutation={DELETE_GUIDELINE}
                            onCompleted={() => {
                              toast.info("Guideline removed successfully!");
                            }}
                            refetchQueries={[
                              {
                                query: GET_GUIDELINES,
                                variables: {
                                  team_id: localStorage.getItem(
                                    settings.TEAM_ID_TOKEN
                                  ),
                                },
                              },
                            ]}
                          >
                            {(deleteGuideline, { loading }) => {
                              return (
                                <Button
                                  color="red"
                                  icon="trash"
                                  loading={loading}
                                  onClick={() => {
                                    if (
                                      window.confirm(
                                        "Are you sure you want to remove this guideline?"
                                      )
                                    ) {
                                      deleteGuideline({
                                        variables: { id: item.id },
                                      });
                                    }
                                  }}
                                />
                              );
                            }}
                          </Mutation>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table>
            );
          }}
        </Query>
      </div>
    );
  }
}
export default GuidelineSection;
