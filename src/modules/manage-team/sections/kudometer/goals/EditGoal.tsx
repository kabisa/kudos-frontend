import { Mutation } from '@apollo/react-components';
import { toast } from 'react-toastify';
import { Button, Form, Message } from 'semantic-ui-react';
import React, { ChangeEvent } from 'react';
import { GraphQLError } from 'graphql';
import {
  CREATE_GOAL, CreateGoalParameters, GET_KUDOMETERS, UPDATE_GOAL,
} from '../KudometerQuerries';
import settings from '../../../../../config/settings';
import { getGraphqlError } from '../../../../../support';
import { Storage } from '../../../../../support/storage';

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

export class EditGoal extends React.Component<EditGoalProps, State> {
  constructor(props: EditGoalProps) {
    super(props);

    this.state = {
      goalKudos: '',
      goalName: '',
      error: '',
      editing: false,
      editGoalName: '',
      editGoalKudos: '',
      editGoalId: '',
    };

    this.handleChange = this.handleChange.bind(this);
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

  handleError(error: GraphQLError) {
    const displayError = getGraphqlError(error);

    this.setState({
      error: displayError,
    });
  }

  handleChange(e: ChangeEvent, { name, value }: any) {
    // @ts-ignore
    this.setState({ [name]: value });
  }

  render() {
    return (
      <Mutation<CreateGoalParameters>
        mutation={this.state.editing ? UPDATE_GOAL : CREATE_GOAL}
        onCompleted={() => {
          toast.info(
            this.state.editing ? 'Goal updated successfully!' : 'Goal created successfully!',
          );
          this.setState({
            goalName: '',
            goalKudos: '',
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
            <Form
              onSubmit={() => (this.state.editing
                ? this.updateGoal(mutate) : this.createGoal(mutate)
              )}
            >
              <Form.Group widths="equal">
                <Form.Input
                  data-testid="goal-name"
                  fluid
                  required
                  label="Name"
                  name={this.state.editing ? 'editGoalName' : 'goalName'}
                  placeholder="Name"
                  value={this.state.editing ? this.state.editGoalName : this.state.goalName}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  required
                  label="Kudos"
                  name={this.state.editing ? 'editGoalKudos' : 'goalKudos'}
                  type="number"
                  min="100"
                  placeholder="Kudos"
                  value={this.state.editing ? this.state.editGoalKudos : this.state.goalKudos}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Button data-testid="submit-button" color="blue" loading={loading} disabled={loading} type="submit">
                {this.state.editing ? 'Update goal' : 'Create goal'}
              </Button>
              {this.state.editing && (
              <Button data-testid="cancel-button" color="orange" onClick={() => this.setState({ editing: false })}>
                Cancel
              </Button>
              )}
              {displayError && (
              <Message negative>
                <Message.Header>Unable to create goal.</Message.Header>
                <p>{displayError}</p>
              </Message>
              )}
            </Form>
          );
        }}
      </Mutation>
    );
  }
}
