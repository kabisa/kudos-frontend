import React, { Component } from "react";
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
import settings from "../../../config/settings";
import { getGraphqlError } from "../../../support";

export const DELETE_KUDOMETER = gql`
  mutation DeleteKudometer($id: ID!) {
    deleteKudosMeter(kudosMeterId: $id) {
      kudosMeterId
    }
  }
`;

export const DELETE_GOAL = gql`
  mutation DeleteGoal($id: ID!) {
    deleteGoal(goalId: $id) {
      goalId
    }
  }
`;

export const CREATE_KUDOMETER = gql`
  mutation CreateKudometer($name: String!, $team_id: ID!) {
    createKudosMeter(name: $name, teamId: $team_id) {
      kudosMeter {
        id
      }
    }
  }
`;

export const CREATE_GOAL = gql`
  mutation CreateGoal($name: String!, $kudometer: ID!, $amount: Int!) {
    createGoal(name: $name, amount: $amount, kudosMeterId: $kudometer) {
      goal {
        id
      }
    }
  }
`;

export const GET_KUDOMETERS = gql`
  query Kudometers($team_id: ID!) {
    teamById(id: $team_id) {
      kudosMeters {
        id
        name
        goals {
          id
          amount
          name
        }
      }
    }
  }
`;

export const UPDATE_GOAL = gql`
  mutation UpdateGoal($name: String!, $amount: Int!, $goalId: ID!) {
    updateGoal(name: $name, amount: $amount, goalId: $goalId) {
      goal {
        id
      }
    }
  }
`;

export class KudometerSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: undefined,
      selected: undefined,
      goalKudos: "",
      goalName: "",
      error: undefined,
      editingGoal: false,
      editGoalName: undefined,
      editGoalKudos: undefined,
      editGoalId: undefined,
    };
    this.initialState = this.state;

    this.handleChange = this.handleChange.bind(this);
    this.createKudometer = this.createKudometer.bind(this);
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  createKudometer(mutate) {
    this.setState({ error: null });
    mutate({
      variables: {
        name: this.state.name,
        team_id: localStorage.getItem(settings.TEAM_ID_TOKEN),
      },
    });
  }

  render() {
    return (
      <div>
        <Header as="h2">
          <Icon name="flag outline" />
          <Header.Content>
            Kudometers
            <Header.Subheader>Manage kudometers</Header.Subheader>
          </Header.Content>
        </Header>
        <Divider />
        <Mutation
          mutation={CREATE_KUDOMETER}
          onCompleted={() => {
            this.setState(this.initialState);
            toast.info("Kudometer created successfully!");
          }}
          refetchQueries={[
            {
              query: GET_KUDOMETERS,
              variables: {
                team_id: localStorage.getItem(settings.TEAM_ID_TOKEN),
              },
            },
          ]}
        >
          {(createKudometer, { error, loading }) => {
            let displayError;
            if (error) {
              displayError = getGraphqlError(error);
            }
            if (this.state.error) {
              displayError = this.state.error;
            }
            return (
              <Form onSubmit={() => this.createKudometer(createKudometer)}>
                <Form.Input
                  fluid
                  required
                  label="Name"
                  name="name"
                  placeholder="Name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
                <Button
                  color="blue"
                  loading={loading}
                  disabled={loading}
                  type="submit"
                >
                  Create kudometer
                </Button>
                {displayError && (
                  <Message negative>
                    <Message.Header>Unable to create kudometer.</Message.Header>
                    <p>{displayError}</p>
                  </Message>
                )}
              </Form>
            );
          }}
        </Mutation>
        <Divider />
        <Query
          query={GET_KUDOMETERS}
          variables={{ team_id: localStorage.getItem(settings.TEAM_ID_TOKEN) }}
        >
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;

            const kudometer = this.state.selected
              ? data.teamById.kudosMeters.find(
                  kudometer => kudometer.id === this.state.selected.id
                )
              : null;
            const goals = kudometer ? kudometer.goals : [];

            return (
              <div>
                <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Name</Table.HeaderCell>
                      <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {data.teamById.kudosMeters.map(item => {
                      return (
                        <Table.Row key={item.id}>
                          <Table.Cell>{item.name}</Table.Cell>
                          <Table.Cell>
                            <Button
                              color="blue"
                              size="tiny"
                              onClick={() =>
                                this.setState({
                                  selected: item,
                                })
                              }
                            >
                              View goals
                            </Button>
                            <Mutation
                              mutation={DELETE_KUDOMETER}
                              onCompleted={() => {
                                toast.info("Kudometer removed successfully!");
                              }}
                              refetchQueries={[
                                {
                                  query: GET_KUDOMETERS,
                                  variables: {
                                    team_id: localStorage.getItem(
                                      settings.TEAM_ID_TOKEN
                                    ),
                                  },
                                },
                              ]}
                            >
                              {(deleteKudometer, { loading }) => {
                                return (
                                  <Button
                                    color="red"
                                    icon="trash"
                                    size="tiny"
                                    loading={loading}
                                    onClick={() => {
                                      if (
                                        window.confirm(
                                          "REMOVING A KUDOMETER WILL REMOVE ALL RELATED POSTS! Are you sure you want to remove this kudometer?"
                                        )
                                      ) {
                                        deleteKudometer({
                                          variables: { id: item.id },
                                        });
                                        if (
                                          this.state.selected &&
                                          this.state.selected.id === item.id
                                        ) {
                                          this.setState({ selected: null });
                                        }
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

                {this.state.selected && (
                  <div>
                    <Divider />
                    <h1>Goals for Kudometer {this.state.selected.name}</h1>

                    <Mutation
                      mutation={
                        this.state.editingGoal ? UPDATE_GOAL : CREATE_GOAL
                      }
                      onCompleted={() => {
                        toast.info(
                          this.state.editingGoal
                            ? "Goal updated successfully!"
                            : "Goal created successfully!"
                        );
                        this.setState({
                          goalName: "",
                          goalKudos: null,
                          editingGoal: false,
                        });
                      }}
                      refetchQueries={[
                        {
                          query: GET_KUDOMETERS,
                          variables: {
                            team_id: localStorage.getItem(
                              settings.TEAM_ID_TOKEN
                            ),
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
                              this.state.editingGoal
                                ? mutate({
                                    variables: {
                                      name: this.state.editGoalName,
                                      amount: parseInt(
                                        this.state.editGoalKudos
                                      ),
                                      goalId: this.state.editGoalId,
                                    },
                                  })
                                : mutate({
                                    variables: {
                                      name: this.state.goalName,
                                      amount: parseInt(this.state.goalKudos),
                                      kudometer: this.state.selected.id,
                                    },
                                  })
                            }
                          >
                            <Form.Group widths="equal">
                              <Form.Input
                                fluid
                                required
                                label="Name"
                                name={
                                  this.state.editingGoal
                                    ? "editGoalName"
                                    : "goalName"
                                }
                                placeholder="Name"
                                value={
                                  this.state.editingGoal
                                    ? this.state.editGoalName
                                    : this.state.goalName
                                }
                                onChange={this.handleChange}
                              />
                              <Form.Input
                                fluid
                                required
                                label="Kudos"
                                name={
                                  this.state.editingGoal
                                    ? "editGoalKudos"
                                    : "goalKudos"
                                }
                                type="number"
                                min="100"
                                placeholder="Kudos"
                                value={
                                  this.state.editingGoal
                                    ? this.state.editGoalKudos
                                    : this.state.goalKudos
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
                              {this.state.editingGoal
                                ? "Update goal"
                                : "Create goal"}
                            </Button>
                            {this.state.editingGoal && (
                              <Button
                                color="orange"
                                onClick={() =>
                                  this.setState({ editingGoal: false })
                                }
                              >
                                Cancel
                              </Button>
                            )}
                            {displayError && (
                              <Message negative>
                                <Message.Header>
                                  Unable to create goal.
                                </Message.Header>
                                <p>{displayError}</p>
                              </Message>
                            )}
                          </Form>
                        );
                      }}
                    </Mutation>

                    <Table celled fixed>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>Name</Table.HeaderCell>
                          <Table.HeaderCell>Kudos</Table.HeaderCell>
                          <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {goals.map(goal => (
                          <Table.Row key={goal.id}>
                            <Table.Cell>{goal.name}</Table.Cell>
                            <Table.Cell>{goal.amount}</Table.Cell>
                            <Table.Cell>
                              <Button
                                color="yellow"
                                icon="pencil"
                                size="tiny"
                                onClick={() =>
                                  this.setState({
                                    editingGoal: true,
                                    editGoalName: goal.name,
                                    editGoalKudos: goal.amount,
                                    editGoalId: goal.id,
                                  })
                                }
                              />
                              <Mutation
                                mutation={DELETE_GOAL}
                                onCompleted={() => {
                                  toast.info("Goal removed successfully!");
                                }}
                                refetchQueries={[
                                  {
                                    query: GET_KUDOMETERS,
                                    variables: {
                                      team_id: localStorage.getItem(
                                        settings.TEAM_ID_TOKEN
                                      ),
                                    },
                                  },
                                ]}
                              >
                                {(deleteGoal, { loading }) => {
                                  return (
                                    <Button
                                      color="red"
                                      icon="trash"
                                      size="tiny"
                                      loading={loading}
                                      onClick={() => {
                                        if (
                                          window.confirm(
                                            "Are you sure you want to remove this kudometer?"
                                          )
                                        ) {
                                          deleteGoal({
                                            variables: { id: goal.id },
                                          });
                                        }
                                      }}
                                    />
                                  );
                                }}
                              </Mutation>
                            </Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table>
                  </div>
                )}
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}
export default KudometerSection;
