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

export const UPDATE_GUIDELINE = gql`
  mutation UpdateGuideline($guideline: ID!, $name: String!, $kudos: Int!) {
    updateGuideline(guidelineId: $guideline, name: $name, kudos: $kudos) {
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

      editing: false,
      editDescription: "",
      editKudos: null,
      editId: null,
    };
    this.initialState = this.state;

    this.handleChange = this.handleChange.bind(this);
    this.createGuideline = this.createGuideline.bind(this);
    this.updateGuideline = this.updateGuideline.bind(this);
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

  updateGuideline(mutate) {
    this.setState({ editing: false });
    mutate({
      variables: {
        guideline: this.state.editId,
        name: this.state.editDescription,
        kudos: parseInt(this.state.editKudos),
      },
    });
  }

  render() {
    const { editing } = this.state;
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
          mutation={editing ? UPDATE_GUIDELINE : CREATE_GUIDELINE}
          onCompleted={() => {
            this.setState(this.initialState);
            toast.info(
              editing
                ? "Guideline successfully updated!"
                : "Guideline created successfully!"
            );
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
          {(mutate, { error, loading }) => {
            let displayError;
            if (error) {
              displayError = getGraphqlError(error);
            }
            if (this.state.error) {
              displayError = this.state.error;
            }
            return (
              <Form
                onSubmit={() =>
                  editing
                    ? this.updateGuideline(mutate)
                    : this.createGuideline(mutate)
                }
              >
                <Form.Group widths="equal">
                  <Form.Input
                    fluid
                    label="Amount of kudos"
                    placeholder="Kudos"
                    type="number"
                    min="1"
                    max="1000"
                    name={editing ? "editKudos" : "editKudos"}
                    required
                    value={editing ? this.state.editKudos : this.state.kudos}
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    fluid
                    required
                    label="Description"
                    name={editing ? "editDescription" : "description"}
                    placeholder="Description"
                    value={
                      editing
                        ? this.state.editDescription
                        : this.state.description
                    }
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Button
                  color="blue"
                  loading={loading}
                  disabled={loading}
                  type="submit"
                >
                  {editing ? "Update guideline" : "Create guideline"}
                </Button>
                {editing && (
                  <Button
                    color="orange"
                    onClick={() => this.setState({ editing: false })}
                  >
                    Cancel
                  </Button>
                )}
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
              <Table celled compact>
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
                          <Button
                            color="yellow"
                            icon="pencil"
                            size="tiny"
                            onClick={() => {
                              this.setState({
                                editing: true,
                                editDescription: item.name,
                                editKudos: item.kudos,
                                editId: item.id,
                              });
                              document
                                .getElementById("management-container")
                                .scrollIntoView();
                            }}
                          />
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
                                  size="tiny"
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
