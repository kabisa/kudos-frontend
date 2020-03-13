import React, { ChangeEvent } from 'react';
import { Mutation } from 'react-apollo';
import { toast } from 'react-toastify';
import { Button, Form, Message } from 'semantic-ui-react';
import settings from '../../../../config/settings';
import { getGraphqlError } from '../../../../support';
import {
  CREATE_GUIDELINE, CreateGuidelineParameters, GET_GUIDELINES, UPDATE_GUIDELINE,
} from './GuidelinesSection';


export interface EditGuidelineProps {
}

export interface EditGuidelineState {
  editing: boolean;
  kudos: string;
  description: string;
  error: string;
  editDescription: string;
  editKudos: string;
  editId: number;
}

export class EditGuideline extends React.Component<EditGuidelineProps, EditGuidelineState> {
  initialState: EditGuidelineState;

  constructor(props: EditGuidelineProps) {
    super(props);

    this.state = {
      editing: false,
      kudos: '',
      description: '',
      error: '',

      editDescription: '',
      editKudos: '',
      editId: -1,
    };
    this.initialState = this.state;

    this.handleChange = this.handleChange.bind(this);
    this.createGuideline = this.createGuideline.bind(this);
    this.updateGuideline = this.updateGuideline.bind(this);
    this.setEditState = this.setEditState.bind(this);
  }

  setEditState(id: number, kudos: string, description: string) {
    this.setState({
      editing: true,
      editId: id,
      editKudos: kudos,
      editDescription: description,
    });
  }

  createGuideline(mutate: any) {
    this.setState({ error: '' });
    mutate({
      variables: {
        name: this.state.description,
        kudos: Number(this.state.kudos),
        team_id: localStorage.getItem(settings.TEAM_ID_TOKEN),
      },
    });
  }

  handleChange(e: ChangeEvent, { name, value }: any) {
    // @ts-ignore
    this.setState({ [name]: value });
  }

  updateGuideline(mutate: any) {
    mutate({
      variables: {
        guideline: this.state.editId,
        name: this.state.editDescription,
        kudos: Number(this.state.editKudos),
      },
    });
  }

  render() {
    return (
      <Mutation<CreateGuidelineParameters>
        mutation={this.state.editing ? UPDATE_GUIDELINE : CREATE_GUIDELINE}
        onCompleted={() => {
          this.setState(this.initialState);
          toast.info(this.state.editing ? 'Guideline successfully updated!' : 'Guideline created successfully!');
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
              onSubmit={() => (this.state.editing ? this.updateGuideline(mutate) : this.createGuideline(mutate))}
            >
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Amount of kudos"
                  placeholder="Kudos"
                  type="number"
                  min="1"
                  max="1000"
                  name={this.state.editing ? 'editKudos' : 'kudos'}
                  required
                  value={this.state.editing ? this.state.editKudos : this.state.kudos}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  required
                  label="Description"
                  name={this.state.editing ? 'editDescription' : 'description'}
                  placeholder="Description"
                  value={this.state.editing ? this.state.editDescription : this.state.description}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Button color="blue" loading={loading} disabled={loading} type="submit">
                {this.state.editing ? 'Update guideline' : 'Create guideline'}
              </Button>
              {this.state.editing && (
              <Button color="orange" onClick={() => { this.setState({ editing: false }); }}>
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

    );
  }
}
