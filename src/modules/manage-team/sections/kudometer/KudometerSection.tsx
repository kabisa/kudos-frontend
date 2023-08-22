/* eslint-disable no-shadow */
import React, { ChangeEvent, Component } from "react";
import { Button, Divider, Form, Header, Icon, Table } from "semantic-ui-react";
import { Query } from "@apollo/client/react/components";
import type { ApolloClient } from "@apollo/client";
import { ApolloConsumer } from "@apollo/client";
import settings from "../../../../config/settings";
import {
  CREATE_KUDOMETER,
  CreateKudometerParameters,
  CreateKudometerResult,
  GET_KUDOMETERS,
  GetKudoMetersResult,
  Kudometer,
  UPDATE_KUDOMETER,
  UpdateKudoMeterParameters,
  UpdateKudoMeterResult,
} from "./KudometerQueries";
import { Goals } from "./goals/Goals";
import { KudometerRow } from "./KudometerRow";
import { Storage } from "../../../../support/storage";

export interface Props {
  // Future props go here
}

export interface State {
  name: string;
  selected?: Kudometer;
  editing: boolean;
  kudometerId: string;
}

class KudometerSection extends Component<Props, State> {
  initialState: State;

  constructor(props: Props) {
    super(props);

    this.state = {
      name: "",
      selected: undefined,
      editing: false,
      kudometerId: "",
    };

    this.initialState = this.state;

    this.handleChange = this.handleChange.bind(this);
    this.createKudometer = this.createKudometer.bind(this);
    this.handleViewGoalButtonClick = this.handleViewGoalButtonClick.bind(this);
    this.deleteKudometer = this.deleteKudometer.bind(this);
    this.edit = this.edit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
  }

  handleChange(e: ChangeEvent, { name, value }: any) {
    // @ts-ignore
    this.setState({ [name]: value });
  }

  handleViewGoalButtonClick(kudometer: Kudometer) {
    if (this.state.selected?.id === kudometer.id) {
      this.setState({ selected: undefined });
      return;
    }

    this.setState({
      selected: kudometer,
    });
  }

  createKudometer(mutate: any) {
    mutate({
      variables: {
        name: this.state.name,
        team_id: Storage.getItem(settings.TEAM_ID_TOKEN),
      },
    });
  }

  deleteKudometer(id: string) {
    if (this.state.selected && this.state.selected.id === id) {
      this.setState({
        selected: undefined,
      });
    }
  }

  edit(kudosMeter: Kudometer) {
    this.setState({
      editing: true,
      name: kudosMeter.name,
      kudometerId: kudosMeter.id,
    });
  }

  saveKudosMeter(client: ApolloClient<any>) {
    if (this.state.editing) {
      client.mutate<UpdateKudoMeterResult, UpdateKudoMeterParameters>({
        mutation: UPDATE_KUDOMETER,
        variables: {
          name: this.state.name,
          kudos_meter_id: this.state.kudometerId,
        },
        refetchQueries: [
          {
            query: GET_KUDOMETERS,
            variables: {
              team_id: Storage.getItem(settings.TEAM_ID_TOKEN),
            },
          },
        ],
      });
    } else {
      client.mutate<CreateKudometerResult, CreateKudometerParameters>({
        mutation: CREATE_KUDOMETER,
        variables: {
          name: this.state.name,
          team_id: Storage.getItem(settings.TEAM_ID_TOKEN),
        },
        refetchQueries: [
          {
            query: GET_KUDOMETERS,
            variables: {
              team_id: Storage.getItem(settings.TEAM_ID_TOKEN),
            },
          },
        ],
      });
    }

    this.cancelEdit();
  }

  cancelEdit() {
    this.setState({
      editing: false,
      kudometerId: "",
      name: "",
    });
  }

  render() {
    return (
      <ApolloConsumer>
        {(client) => (
          <div>
            <Header as="h2">
              <Icon name="flag outline" />
              <Header.Content>
                Kudometers
                <Header.Subheader>Manage kudometers</Header.Subheader>
              </Header.Content>
            </Header>
            <Divider />
            <Form onSubmit={() => this.saveKudosMeter(client)}>
              <Form.Input
                data-testid="name-input"
                fluid
                required
                label="Name"
                name="name"
                placeholder="Name"
                value={this.state.name}
                onChange={this.handleChange}
              />
              <Button data-testid="create-button" color="blue" type="submit">
                {this.state.editing ? "Edit kudometer" : "Create kudometer"}
              </Button>
              {this.state.editing && (
                <Button
                  data-testid="cancel-edit-button"
                  color="red"
                  onClick={() => {
                    this.cancelEdit();
                  }}
                >
                  Cancel
                </Button>
              )}
            </Form>
            <Divider />
            <Query<GetKudoMetersResult>
              query={GET_KUDOMETERS}
              variables={{ team_id: Storage.getItem(settings.TEAM_ID_TOKEN) }}
            >
              {({ loading, error, data }) => {
                if (loading) return <p> Loading... </p>;
                if (error) return <p> Error! {error.message} </p>;

                return (
                  <div>
                    <Table celled>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>Name</Table.HeaderCell>
                          <Table.HeaderCell colSpan="2">
                            Actions
                          </Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>

                      <Table.Body>
                        {data &&
                        data.teamById &&
                        data.teamById.kudosMeters.length > 0 ? (
                          data.teamById.kudosMeters.map((item) => (
                            <KudometerRow
                              data-testid="kudometer-row"
                              key={item.id}
                              kudometer={item}
                              viewButtonClickHandler={
                                this.handleViewGoalButtonClick
                              }
                              deleteKudometerHandler={this.deleteKudometer}
                              edit={this.edit}
                            />
                          ))
                        ) : (
                          <Table.Row>
                            <Table.Cell>No kudometers available</Table.Cell>
                          </Table.Row>
                        )}
                      </Table.Body>
                    </Table>

                    {this.state.selected && (
                      <Goals kudometer={this.state.selected} />
                    )}
                  </div>
                );
              }}
            </Query>
          </div>
        )}
      </ApolloConsumer>
    );
  }
}

export default KudometerSection;
