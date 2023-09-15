import { Component } from "react";
import { Mutation } from "@apollo/client/react/components";
import { toast } from "react-toastify";

import {
  CREATE_GOAL,
  CreateGoalParameters,
  GET_KUDOMETERS,
  UPDATE_GOAL,
} from "../KudometerQueries";
import settings from "../../../../../config/settings";
import { getGraphqlError } from "../../../../../support";
import { Storage } from "../../../../../support/storage";
import { ApolloError } from "@apollo/client";
import { Button, Input, Label } from "@sandercamp/ui-components";


export interface EditGoalProps {
  kudometerId: string;
}

export interface State {
  goalKudos: string;
  goalName: string;
  error: string;
  editing: boolean;
  editGoalName: string;
  editGoalKudos: string;
  editGoalId: string;
}

export class EditGoal extends Component<EditGoalProps, State> {
  constructor(props: EditGoalProps) {
    super(props);

    this.state = {
      goalKudos: "",
      goalName: "",
      error: "",
      editing: false,
      editGoalName: "",
      editGoalKudos: "",
      editGoalId: "",
    };

    this.setEditState = this.setEditState.bind(this);
    this.handleError = this.handleError.bind(this);
    this.createGoal = this.createGoal.bind(this);
    this.updateGoal = this.updateGoal.bind(this);
  }

  setEditState(id: string, kudos: string, name: string) {
    this.setState({
      editing: true,
      editGoalId: id,
      editGoalKudos: kudos,
      editGoalName: name,
    });
  }

  createGoal(mutation: any) {
    mutation({
      variables: {
        name: this.state.goalName,
        amount: Number.parseInt(this.state.goalKudos, 10),
        kudometer: this.props.kudometerId,
      },
    }).catch(this.handleError);
  }

  updateGoal(mutation: any) {
    mutation({
      variables: {
        name: this.state.editGoalName,
        amount: Number.parseInt(this.state.editGoalKudos, 10),
        goalId: this.state.editGoalId,
      },
    }).catch(this.handleError);
  }

  handleError(error: ApolloError) {
    const displayError = getGraphqlError(error);

    this.setState({
      error: displayError,
    });
  }

  render() {
    return (
      <Mutation<CreateGoalParameters>
        mutation={this.state.editing ? UPDATE_GOAL : CREATE_GOAL}
        onCompleted={() => {
          toast.info(
            this.state.editing
              ? "Goal updated successfully!"
              : "Goal created successfully!",
          );
          this.setState({
            goalName: "",
            goalKudos: "",
            editing: false,
          });
        }}
        refetchQueries={[
          {
            query: GET_KUDOMETERS,
            variables: {
              team_id: Storage.getItem(settings.TEAM_ID_TOKEN),
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
            <form
              onSubmit={() =>
                this.state.editing
                  ? this.updateGoal(mutate)
                  : this.createGoal(mutate)
              }
            >
              <Label>
                Name
                <Input
                  data-testid="goal-name"
                  required
                  name={this.state.editing ? "editGoalName" : "goalName"}
                  placeholder="Name"
                  value={
                    this.state.editing
                      ? this.state.editGoalName
                      : this.state.goalName
                  }
                  onChange={(e) =>
                    this.state.editing
                      ? this.setState({ editGoalName: e.target.value })
                      : this.setState({ goalName: e.target.value })
                  }
                />
              </Label>

              <Label>
                Kudos
                <Input
                  required
                  name={this.state.editing ? "editGoalKudos" : "goalKudos"}
                  type="number"
                  min="100"
                  placeholder="Kudos"
                  value={
                    this.state.editing
                      ? this.state.editGoalKudos
                      : this.state.goalKudos
                  }
                  onChange={(e) =>
                    this.state.editing
                      ? this.setState({ editGoalKudos: e.target.value })
                      : this.setState({ goalKudos: e.target.value })
                  }
                />
              </Label>

              <Button
                data-testid="submit-button"
                variant="primary"
                disabled={loading}
                type="submit"
              >
                {this.state.editing ? "Update goal" : "Create goal"}
              </Button>
              {this.state.editing && (
                <Button
                  data-testid="cancel-button"
                  variant="primary"
                  onClick={() => this.setState({ editing: false })}
                >
                  Cancel
                </Button>
              )}
              {displayError && (
                <div className="errorMessage">
                  <h2>Unable to create goal.</h2>
                  <p>{displayError}</p>
                </div>
              )}
            </form>
          );
        }}
      </Mutation>
    );
  }
}
