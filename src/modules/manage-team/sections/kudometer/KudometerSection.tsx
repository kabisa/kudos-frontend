import { Component } from "react";
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
import { Button, Icon, Input, Label } from "@sandercamp/ui-components";

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

    this.createKudometer = this.createKudometer.bind(this);
    this.handleViewGoalButtonClick = this.handleViewGoalButtonClick.bind(this);
    this.deleteKudometer = this.deleteKudometer.bind(this);
    this.edit = this.edit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
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
        ]
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
          <div className="form-container">
            <h2>
              <Icon name="flag" />
              Kudometers
            </h2>
            <form onSubmit={() => this.saveKudosMeter(client)}>
              <Label>
                Name
                <Input
                  data-testid="name-input"
                  required
                  name="name"
                  placeholder="Name"
                  value={this.state.name}
                  onChange={(e) => this.setState({ name: e.target.value })}
                />
              </Label>

              <Button
                data-testid="create-button"
                variant="primary"
                type="submit"
              >
                {this.state.editing ? "Edit kudometer" : "Create kudometer"}
              </Button>
              {this.state.editing && (
                <Button
                  data-testid="cancel-edit-button"
                  variant="primary"
                  onClick={() => {
                    this.cancelEdit();
                  }}
                >
                  Cancel
                </Button>
              )}
            </form>
            <Query<GetKudoMetersResult>
              query={GET_KUDOMETERS}
              variables={{ team_id: Storage.getItem(settings.TEAM_ID_TOKEN) }}
            >
              {({ loading, error, data }) => {
                if (loading) return <p> Loading... </p>;
                if (error) return <p> Error! {error.message} </p>;

                return (
                  <div>
                    <table>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th></th>
                          <th>Actions</th>
                        </tr>
                      </thead>

                      <tbody>
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
                          <tr>
                            <td>No kudometers available</td>
                          </tr>
                        )}
                      </tbody>
                    </table>

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
